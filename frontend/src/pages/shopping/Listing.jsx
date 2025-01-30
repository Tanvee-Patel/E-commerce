import Filter from '@/components/shopping/Filter'
import ProductDetails from '@/components/shopping/ProductDetails'
import ProductTile from '@/components/shopping/ProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/user/productSlice'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const Listing = () => {
  const dispatch = useDispatch()
  const { productList, productDetails } = useSelector(state => state.userProducts)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog]=useState(false)

  function createSearchParamsHelper(filterParams){
    const queryParams = [];
    for(const [key, value] of Object.entries(filterParams)){
      if(Array.isArray(value) && value.length > 0){
        const paramValue = value.join(',')
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }
    return queryParams.join('&')
  }

  function handleSort(value) {
    setSort(value)
  }

  function handleFilter (getSectionId, getCurrentOption){
    let copyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId);
    if(indexOfCurrentSection === -1){
      copyFilters = {
        ...copyFilters,
        [getSectionId] : [getCurrentOption]
      }
    }
    else{
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption);
      if(indexOfCurrentOption == -1) copyFilters[getSectionId].push(getCurrentOption)
        else copyFilters[getSectionId].splice(indexOfCurrentOption, 1)
    }
    setFilters(copyFilters)
    sessionStorage.setItem('filters', JSON.stringify(copyFilters))
  }

  function handleGetProductDetails(getCurrentProductId){
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId))
    setOpenDetailsDialog(true)
  }

  useEffect(()=>{
    setSort('Price: Low to High')
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  },[])

  useEffect(()=>{
    if(filters && Object.keys(filters).length > 0){
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams( new URLSearchParams(createQueryString))
    }
  },[filters])

  useEffect(() => {
    if (filters !== null && sort !== null) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(`${createQueryString}&sortBy=${encodeURIComponent(sort)}`));
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  useEffect(()=>{
    if(productDetails !== null) setOpenDetailsDialog(true)
  },[productDetails])
  // console.log("Product Details", productDetails);

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-6'>
      <div className='w-full max-w-7xl flex flex-col md:flex-row gap-8'>
        {/* Filter Component */}
        <div className='bg-white p-6 rounded-lg shadow-xl w-full md:w-1/4'>
          <Filter filters={filters} handleFilter={handleFilter} />
        </div>

        {/* Product List */}
        <div className='w-full md:w-3/4 space-y-8'>
          <div className='bg-white p-6 rounded-lg shadow-xl'>
            <h2 className='text-4xl font-extrabold text-gray-900 tracking-tight mb-6 text-center'>
              All Products
            </h2>
            <div className='flex justify-between items-center mb-6'>
              <span className='text-gray-500'>{productList?.length} products</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowUpDown className='h-4 w-4' />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {
                      sortOptions.map((sortItem) =>
                        <DropdownMenuRadioItem
                          value={sortItem.id}
                          key={sortItem.id}>
                          {sortItem.label}
                        </DropdownMenuRadioItem>
                      )
                    }
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {
                productList && productList.length > 0 ?
                  productList.map((productItem, index) =>
                    <ProductTile
                      product={productItem}
                      key={productItem.id || index}
                      handleGetProductDetails={handleGetProductDetails}
                    />
                  )
                  :
                  <p className='col-span-full text-center text-xl text-gray-500'>No products available</p>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Dialog */}
      <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  )
}

export default Listing