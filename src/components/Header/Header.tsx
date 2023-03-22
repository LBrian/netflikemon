import { useAuth } from '../../hooks'

function Header() {
  const { removeAuth, currentUser, isAuthenticated } = useAuth()

  return (
    <div className='flex btm-nav-lg short:btm-nav-sm navbar bg-red-500 text-white text-2xl short:text-xl font-bold sticky top-0 z-10 px-6'>
      <div className='flex-1'>{document.title}</div>
      {isAuthenticated && (
        <div className='space-x-1'>
          <button data-testid='logout' aria-label='Log out' className='btn btn-xs btn-ghost' onClick={removeAuth}>
            Log out
          </button>
          <div data-testid='avatar' className='avatar placeholder'>
            <div className='bg-neutral-focus text-neutral-content rounded-full w-12'>
              <span className='text-lg capitalize'>{currentUser?.charAt(0)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
