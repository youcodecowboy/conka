import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/app/lib/shopify';

// Query to get product variants by product ID (including selling plans for subscriptions)
const GET_PRODUCT_VARIANTS = `
  query getProductVariants($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      variants(first: 50) {
        edges {
          node {
            id
            title
            sku
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
      sellingPlanGroups(first: 10) {
        edges {
          node {
            name
            appName
            sellingPlans(first: 10) {
              edges {
                node {
                  id
                  name
                  description
                  recurringDeliveries
                  priceAdjustments {
                    adjustmentValue {
                      ... on SellingPlanPercentagePriceAdjustment {
                        adjustmentPercentage
                      }
                      ... on SellingPlanFixedAmountPriceAdjustment {
                        adjustmentAmount {
                          amount
                          currencyCode
                        }
                      }
                      ... on SellingPlanFixedPriceAdjustment {
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                  options {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface SellingPlanPriceAdjustment {
  adjustmentValue: {
    adjustmentPercentage?: number;
    adjustmentAmount?: { amount: string; currencyCode: string };
    price?: { amount: string; currencyCode: string };
  };
}

interface SellingPlan {
  id: string;
  name: string;
  description: string | null;
  recurringDeliveries: boolean;
  priceAdjustments: SellingPlanPriceAdjustment[];
  options: { name: string; value: string }[];
}

interface ProductVariantsResponse {
  product: {
    id: string;
    title: string;
    handle: string;
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          sku: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
        };
      }>;
    };
    sellingPlanGroups?: {
      edges: Array<{
        node: {
          name: string;
          appName: string;
          sellingPlans: {
            edges: Array<{
              node: SellingPlan;
            }>;
          };
        };
      }>;
    };
  } | null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'productId query param required' }, { status: 400 });
  }

  // Convert numeric ID to Shopify GID format
  const gid = productId.startsWith('gid://') 
    ? productId 
    : `gid://shopify/Product/${productId}`;

  try {
    const response = await shopifyFetch<ProductVariantsResponse>(GET_PRODUCT_VARIANTS, { id: gid });

    if (response.errors) {
      return NextResponse.json({ errors: response.errors }, { status: 400 });
    }

    if (!response.data?.product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product = response.data.product;
    const variants = product.variants.edges.map(edge => ({
      id: edge.node.id,
      title: edge.node.title,
      sku: edge.node.sku,
      price: `${edge.node.price.amount} ${edge.node.price.currencyCode}`,
      availableForSale: edge.node.availableForSale,
    }));

    // Extract selling plans (subscriptions)
    const sellingPlanGroups = product.sellingPlanGroups?.edges.map(group => ({
      name: group.node.name,
      appName: group.node.appName,
      sellingPlans: group.node.sellingPlans.edges.map(sp => ({
        id: sp.node.id,
        name: sp.node.name,
        description: sp.node.description,
        recurringDeliveries: sp.node.recurringDeliveries,
        discountPercentage: sp.node.priceAdjustments[0]?.adjustmentValue?.adjustmentPercentage || 0,
        options: sp.node.options,
      })),
    })) || [];

    return NextResponse.json({
      product: {
        id: product.id,
        title: product.title,
        handle: product.handle,
      },
      variants,
      sellingPlanGroups,
      // Helper: formatted for copy-paste into mapping file
      mappingCode: variants.map(v => `'${v.sku}': '${v.id}', // ${v.title} - ${v.price}`).join('\n'),
    });
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch product' 
    }, { status: 500 });
  }
}

