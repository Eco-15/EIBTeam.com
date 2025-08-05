import React from 'react';
import { InfiniteSlider } from '@/components/ui/infinite-slider';

const PartnersSlider = () => {
  const partners = [
    <img
      src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnTJQQx9SOYKyMgiRoL2B5edw4DcX93EUupS7n"
      alt="National Life Group"
      className="h-[120px] w-auto"
    />,
    <img
      src="https://www.usinsuranceagents.com/wp-content/uploads/2011/11/american-national-insurance-company.png"
      alt="American Life"
      className="h-[120px] w-auto"
    />,
    <img
      src="https://cdn.prod.website-files.com/5cd06573f0a28dce76ef883f/5d1121ad829994b960189b24_logo-foresters.png"
      alt="Foresters Financial"
      className="h-[120px] w-auto"
    />,
    <img
      src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYr9ooWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ"
      alt="North American Company"
      className="h-[120px] w-auto"
    />,
    <img
      src="https://www.retireguide.com/wp-content/uploads/silac-logo.png"
      alt="Silac"
      className="h-[120px] w-auto"
    />,
     <img
      src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfxh6gxWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ"
      alt="Silac"
      className="h-[120px] w-auto"
    />,
      <img
      src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnEaJC80mqSPpoJ2e6DMAi7Z5HO8rdj3ItNTRV"
      alt="National Western"
      className="h-[120px] w-auto"
    />,
      <img
      src="https://upload.wikimedia.org/wikipedia/commons/b/b3/AIG_logo.svg"
      alt="AIG"
      className="h-[120px] w-auto"
    />,
      <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/F%26G_Annuities_%26_Life.png/960px-F%26G_Annuities_%26_Life.png"
      alt="F&G"
      className="h-[120px] w-auto"
    />,
    <img
      src="https://cdn.prod.website-files.com/5cd06573f0a28dce76ef883f/5fadb3dddc6e0d498b749559_logo-mutual-of-omaha.png"
      alt="Mutual of Omaha"
      className="h-[120px] w-auto"
    />,
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Industry Leaders</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with the best in the industry to provide our agents and clients with exceptional service and support.
          </p>
        </div>
        
        <InfiniteSlider gap={32} duration={20} className="py-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 min-w-[280px] h-[200px]"
            >
              {partner}
            </div>
          ))}
        </InfiniteSlider>

      
      </div>
    </section>
  );
};

export default PartnersSlider;