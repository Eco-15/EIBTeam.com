import React from 'react';
import { InfiniteSlider } from '@/components/ui/infinite-slider';

const PartnersSlider = () => {
  const partners = [
    <img
      src="data:image/png;base64,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"
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
      src="https://www.northamericancompany.com/image/layout_set_logo?img_id=1417326116&t=1752264372596"
      alt="North American Company"
      className="h-[120px] w-auto"
    />,
    <img
      src="https://www.retireguide.com/wp-content/uploads/silac-logo.png"
      alt="Silac"
      className="h-[120px] w-auto"
    />,
      <img
      src="https://firstincomeadvisors.com/members/wp-content/uploads/sites/2/2019/07/nwllogo-1.jpg"
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