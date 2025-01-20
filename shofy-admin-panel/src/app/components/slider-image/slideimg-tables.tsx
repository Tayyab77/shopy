"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Pagination from '../ui/Pagination';
import ErrorMsg from '../common/error-msg';
import SlideimgEditDelete from './edit-delete-slideimg';
import { useDeleteSliderImageMutation, useGetAllSliderImagesQuery } from '@/redux/slider/slideimgApi';
import usePagination from '@/hooks/use-pagination';

const SlideimgTables = () => {
  //The selector is embedded within the useGetAllSliderImagesQuery hook and works seamlessly 
  //to fetch, cache, and provide data to the SlideimgTables component.
  const { data: slideimgs, isError, isLoading } = useGetAllSliderImagesQuery(); //selector works on this line
  const [deleteSlideimg, { data: delData, error: delErr }] = useDeleteSliderImageMutation();
  const paginationData = usePagination(slideimgs?.result || [], 5);
  const { currentItems, handlePageClick, pageCount } = paginationData;
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && slideimgs?.result.length === 0) {
    content = <ErrorMsg msg="No Slideimg Found" />;
  }

  if (!isLoading && !isError && slideimgs?.success && currentItems.length > 0) {
    content = (
      <>
        <div className="overflow-scroll 2xl:overflow-visible">
          <div className="w-[975px] 2xl:w-full">
            <table className="w-full text-base text-left text-gray-500 ">

              <thead>
                <tr className="border-b border-gray6 text-tiny">
                  <th scope="col" className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px]">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end">
                    Product type
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end">
                    Items
                  </th>
                  <th scope="col" className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
{/* [...currentItems.reverse()]: This part creates a shallow copy of the currentItems array 
and reverses it. The reverse() method is applied directly to the copy of the array to 
avoid mutating the original currentItems array. The spread operator ... is used to create 
a new array.
.map(item => (...)): The map() method is used to iterate over the reversed currentItems array,
 creating a new array of JSX elements based on each item. For each item, a <tr> (table row)
   element is created.               */}
                {[...currentItems.reverse()].map(item => (
                  <tr key={item._id} className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="px-3 py-3 pl-0 font-normal text-[#55585B]">
                      #{item._id.slice(2, 10)}
                    </td>
                    <td className="pr-8 py-5 whitespace-nowrap">
                      <a href="#" className="flex items-center space-x-5">
                        {item.img && <Image className="w-10 h-10 rounded-full shrink shrink-0 object-cover" src={item.img} alt="image" width={40} height={40} />}
                        <span className="font-medium text-heading text-hover-primary transition">{item.parent}</span>
                      </a>
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      /{item.productType}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.products?.length}
                    </td>
                    <td className="px-9 py-3 text-end">
                      <div className="flex items-center justify-end space-x-2">
                        <SlideimgEditDelete id={item._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="mb-0 text-tiny">Showing 1-{currentItems.length} of {slideimgs?.result.length}</p>
          <div className="pagination py-3 flex justify-end items-center pagination">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
      {content}
    </div>
  );
};

export default SlideimgTables;
