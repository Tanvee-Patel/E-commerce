import { CircleUserRound, House, LogOut, ShoppingCart, SquareMenu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/authSlice'
import CartWrapper from './CartWrapper'
import { fetchCartItems } from '@/store/user/cartSlice'
import { Label } from '../ui/label'

function MenuItems() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  function handleNavigate(getCurrentMenuItems) {
    sessionStorage.removeItem('filters')
    const currentFilter = getCurrentMenuItems.id !== 'home' && getCurrentMenuItems.id !== 'products' && getCurrentMenuItems.id !== 'search' ?
      {
        category: [getCurrentMenuItems.id]
      } : null
    if (currentFilter) {
      sessionStorage.setItem('filters', JSON.stringify(currentFilter));
      setSearchParams(new URLSearchParams({ category: getCurrentMenuItems.id }));
    }
    navigate(getCurrentMenuItems.path);
  }

  return (
    <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
      {
        shoppingViewHeaderMenuItems.map(menuItem =>
          <Label
            onClick={() => handleNavigate(menuItem)}
            key={menuItem.id}
            className='text-sm font-medium cursor-pointer'
          >
            {menuItem.label}
          </Label>
        )
      }
    </nav>
  );
}

function HeaderRightContent({ closeMenu }) {
  const { user } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.userCart)

  function handleLogout() {
    dispatch(logoutUser());
    closeMenu();
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id))
  }, [dispatch])

  return (
    <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="mb-3 relative">
          <ShoppingCart className='h-6 w-6' />
          <span className='absolute -top-1.5 -right-1.5 backdrop-blur-lg bg-white/40 text-gray-900 font-semibold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-indigo-400 shadow-lg transition-all duration-300 hover:scale-110'>
            {cartItems?.items?.length}
          </span>
          <span className='sr-only'>User shopping cart</span>
        </Button>
        <CartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ?
            cartItems.items : []} />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black lg:mb-3">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as {user?.username}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/user/account')}>
            <CircleUserRound className='mr-2 h-4 w-4' />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className='mr-2 h-4 w-4' /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  );
}

const SHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-white shadow-md'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to="/user/home" className='flex items-center gap-2 text-gray-900'>
          <House className='h-6 w-6 text-primary-600' />
          <span className='font-bold text-primary-600'>
            E-commerce
          </span>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden text-gray-900 border-gray-300 hover:border-primary-600" onClick={handleOpen}>
              <SquareMenu className='h-6 w-6 text-primary-600' />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-white p-4">
            <HeaderRightContent closeMenu={handleClose} />
            <MenuItems closeMenu={handleClose} />
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          <MenuItems closeMenu={handleClose} />
        </div>
        {
          isAuthenticated ? (
            <div className='hidden lg:block'>
              <HeaderRightContent closeMenu={handleClose} />
            </div>
          ) : null
        }
      </div>
    </header>
  );
};

export default SHeader;
