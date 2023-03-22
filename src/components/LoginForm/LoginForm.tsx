import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks'

type FormFields = {
  email: string
  password: string
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>()

  const emailFieldPattern = {
    value: /\S+@\S+\.\S+/,
    message: 'Incorrect email format'
  }

  const onSubmit = ({ email }: FormFields) => {
    setLoading(true)
    setAuth(email)
    setLoading(false)
  }

  return (
    <div className='m-auto max-w-xs w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div>
          <input
            disabled={loading}
            placeholder='Email'
            data-testid='email-input'
            className='input input-bordered w-full'
            {...register('email', {
              required: 'Email Address is required',
              pattern: emailFieldPattern
            })}
          />
          <p className='text-xs text-error mt-2 min-h-[16px]'>{errors.email?.message}</p>
        </div>
        <div>
          <input
            disabled={loading}
            data-testid='password-input'
            placeholder='Password'
            className='input input-bordered w-full'
            {...register('password', {
              required: 'You must specify a password',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters'
              }
            })}
          />
          <p className='text-xs text-error mt-2 min-h-[16px]'>{errors.password?.message}</p>
        </div>
        <div className='text-center'>
          <button
            aria-label='Log in'
            data-testid='login'
            disabled={loading}
            type='submit'
            className={`btn mx-auto ${loading && 'loading'}`}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
