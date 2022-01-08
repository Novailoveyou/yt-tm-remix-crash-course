import { useActionData, json, redirect } from 'remix'
import { db } from '~/utils/db.server'

const badRequest = (data: {}) => {
  return json(data, { status: 400 })
}

export const action = async ({ request }: { request: Request }) => {
  const form = await request.formData()
  const loginType = form.get('loginType')
  const username = form.get('username')
  const password = form.get('password')

  const fields = { loginType, username, password }

  const fieldErrors = {
    username: validiteUsername(username),
    password: validatePassword(password)
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields })
  }

  switch (loginType) {
    case 'login': {
      // Find user
      // Check user
      // Create user session
    }
    case 'register': {
      // Check if user exists
      // Create user
      // Create user session
    }
    default: {
      return badRequest({
        fields,
        formError: 'Login type is not valid'
      })
    }
  }
}

const Login = () => {
  const actionData = useActionData()

  return (
    <div className='auth-container'>
      <div className='page-header'>
        <h1>Login</h1>
      </div>

      <div className='page-content'>
        <form method='POST'>
          <fieldset>
            <legend>Login or Register</legend>
            <label>
              <input
                type='radio'
                name='loginType'
                value='login'
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === 'login'
                }
              />{' '}
              Login
            </label>
            <label>
              <input type='radio' name='loginType' value='register' /> Register
            </label>
          </fieldset>
          <div className='form-control'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              id='username'
              defaultValue={actionData?.fields?.username}
            />
            <div className='error'>
              {actionData?.fieldErrors?.username &&
                actionData.fieldErrors.username}
            </div>
          </div>
          <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              defaultValue={actionData?.fields?.password}
            />
            <div className='error'>
              {actionData?.fieldErrors?.password &&
                actionData.fieldErrors.password}
            </div>
          </div>
          <button className='btn btn-block' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
