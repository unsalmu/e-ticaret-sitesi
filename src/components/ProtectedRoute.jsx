import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector(state => state.client.user)
  const isAuthed = !!(user && user.token)
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

