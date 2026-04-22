export type ServiceImageCategory = 'RP' | 'GAT' | 'VDS' | 'ST';

const IMAGE_COUNT = 10;

export function getRandomCategoryImage(category: ServiceImageCategory): string {
  const randomNumber = Math.floor(Math.random() * IMAGE_COUNT) + 1;
  const paddedNumber = String(randomNumber).padStart(2, '0');
  return `/services/${category}${paddedNumber}.png`;
}
