import Filter from '@/components/shopping/Filter'
import ProductTile from '@/components/shopping/ProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts } from '@/store/user/productSlice'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const Listing = () => {
  const dispatch = useDispatch()
  const { productList } = useSelector(state => state.userProducts)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

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
    dispatch(fetchAllFilteredProducts())
  }, [dispatch])

  console.log("Search Params",searchParams.toString());
  

  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
      <Filter filters={filters} handleFilter={handleFilter}/>
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold'>All products</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>{productList?.length} products</span>
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
                    sortOptions.map(sortItem =>
                      <DropdownMenuRadioItem
                        value={sortItem.label}
                        key={sortItem.id}>
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    )
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {
            productList && productList.length > 0 ?
              productList.map((productItem, index) => <ProductTile product={productItem} key={productItem.id || index} />)
              : null
          }
        </div>
      </div>
    </div>
  )
}

export default Listing