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
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///9bvGlRuWBTuWLr9uzC5cew3bba791Yu2Z1xoCDy43h8uRLt1tfvm31+/Z6yIXP6tPn9emq2rD0+/WX05+g1qdHtljG5sqn2a5lwHKGzJB4x4Nrw3i237uMzpXb796Y06HogLjSAAAEFklEQVR4nO2c2XqCMBBGw6KibCJ2s7b1/Z+ylGLrApkEw5jx+891rDlMnElCGqUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAui9EU7edTsl3ctqsXi7S4i+H2ORzHc9V+vsyodpu23ezne/LyaR1zG8ZhMI7wt6urhGgXzX8N2+9JojAqP5gld1QXXRq2lmH0ueA0/MqYDVvJ9zWj4nJcEG8xbByzsmIzfBn3S7zN8CeOGzbFfFQQbzVs/sIyZTLcjAri7YZNGGc8hnF0J8MgyF55FD/HDFMnhkG4ZTFcjBmmbgyD8MCiOKZgODIMeFLq4NczGAYZR/Ev7hjDpkXNoLi1T6cODVcMhqn95NSdYRByjNO99Th1aJi8MRh+WOcah4ZBOJ/esLirYRAwbHBY5xqnhhxBXNsG0alhkk9vqN4sc43bUcqRTl8th6lbw4ShJqaWw9StYZAxTGwsp9+ODTkWw5Yl0bFhspve0HKp79gw4MimpdUwdW0YMuwu2q0SnRu+TG9YWC0wXBtGHGt9sreTGnLsSVkNU9eGSclgaLXAcG64ZDC0yqYyDW2KvkzDyqLoyzS02a4RamixhBJqaPEGQ6ihyh/e0HxDSqqh+Ut9qYb1w8fQfC9DrOHGNIhiDY3fQok1VA8/So0PZsg1NF0GyzWsH97QtF4INjSsF4INDdcXgg2VkaBoQ7OT35INzeqFZMPq4Q3N9qNEGz6Z1AvRhkb1QrShUb2QbWhSL2QbmtQL2YaxwUJftqFJvRBuaLC+EG5osB8l3NDgpKJ0Q3paI92QntZ0hmTp9NWQfs3WGZLB9taQfM3WGZKHG7w1JM99d4ZkO28NC6JDR0NyueytoToQw7QzJJ+Ev4ZUNu0M1TuRTP01pIr+0ZBKph4bEmdrjoZUqvHYsNLPTY+G1Jt/jw2JVzRHQ+pAo8+G+mL+Z0jUfJ8NC+34+zOs9aPZZ0P9zO3PkFheeG2o/Veof0N9NvXaUJtE/g31uzp+G+pOuZ0Yanvvt6FuXnNiqA2i54bz4X6dGurmsJ4baq6TODXUZV3PDTX3D50Zaoaz74bDx9zODYcXwt4bzoZmLOeGw0XRe0O1G/iJXRgOKvpvWAxcdnZp2CTU3ob+G6o06u35laGq8r5wCzAcCM61oSreezQkGKqvpEexx1Cpp+uHIcJQxfvr/vUaqvXVSJVh2AQnuwxOv6FSh4uWUgxVWl4MwCFDVe3C0ziKMWwSzio8zaqDhs3T2Cb/j0OQYfNznC+jxjKhDJWqZ595+PtARBk2xOvX3T6Jfu54pu47TmeHVR6d3QWtI9tP33tz6riqzO6TKaq0u887JZmyxwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDHf/9ZOoZkF1WMAAAAASUVORK5CYII="
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