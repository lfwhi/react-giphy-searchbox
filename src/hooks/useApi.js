import { useReducer } from 'react'
import dataFetchReducer from '../reducers/dataFetchReducer'

const useApi = (customHeaders = {}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: [],
    lastPage: false,
  })

  const fetchCall = (url, isMore) => {
    if (isMore) {
      dispatch({ type: 'FETCH_MORE_INIT' })
    } else {
      dispatch({ type: 'FETCH_INIT' })
    }

    fetch(url, {
      headers: customHeaders,
    })
      .then(async response => {
        if (response.ok) {
          const data = await response.json()
          dispatch({
            type: 'FETCH_MORE_SUCCESS',
            payload: data.data,
            pagination: data.pagination,
          })
        } else {
          dispatch({ type: 'FETCH_FAILURE' })
        }
      })
      .catch(() => {
        dispatch({ type: 'FETCH_FAILURE' })
      })
  }

  return [state, fetchCall]
}

export default useApi
