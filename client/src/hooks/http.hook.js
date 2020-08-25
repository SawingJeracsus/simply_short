import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [ loading, setLoading ] = useState( false)
    const [ error, setError ] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if(body && typeof body != "string") {
                body = JSON.stringify(body)
                headers['Content-Type'] = "application/json"
            }

            const responce = await fetch(url, {
                method,
                body,
                headers
            })
            const data = await responce.json()
            if(!responce.ok){
                throw new Error(data.message || 'Smth going wrong')
            }
            setLoading(false)
            return data

        } catch (error) {
            setLoading(false)
            setError(error.message)
            throw error
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, error, clearError, request}
}