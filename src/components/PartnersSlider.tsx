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