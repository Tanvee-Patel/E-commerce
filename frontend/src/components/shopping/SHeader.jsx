import { CircleUserRound, House, LogOut, ShoppingCart, SquareMenu } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/authSlice'

function MenuItems({ closeMenu }) {
  return (
    <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
      {
        shoppingViewHeaderMenuItems.map(menuItem =>
          <Link
            key={menuItem.id}
            to={menuItem.path}
            className='text-sm font-medium'
            onClick={closeMenu}  
          >
            {menuItem.label}
          </Link>
        )
      }
    </nav>
  );
}

function HeaderRightContent({ closeMenu }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
    closeMenu(); 
  }

  return (
    <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
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
      <Button variant="outline" size="icon" className="mb-3">
        <ShoppingCart className='h-6 w-6' />
        <span className='sr-only'>User shopping cart</span>
      </Button>
    </div>
  );
}

const SHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to="/user/home" className='flex items-center gap-2'>
          <House className='h-6 w-6' />
          <span className='font-bold'>
            E-commerce
          </span>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" onClick={handleOpen}>
              <SquareMenu className='h-6 w-6' />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
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
