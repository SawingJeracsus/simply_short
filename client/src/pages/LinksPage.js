import React, { useState, useContext, useCallback, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'

const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {request, loading} = useHttp()
    const { token } = useContext(AuthContext) 

    const fetchedLinks = useCallback( async () => {
        try {
            const fetchedLinks = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetchedLinks)
        } catch (e) {
            
        }
    }, [request, token])


    useEffect(() => {
        fetchedLinks()
    }, [fetchedLinks])

    if(loading){
        return(<Loader />)
    }
    return(
        <div>
            {!loading && <LinksList links = {links}/>}
        </div>
    )
}

export default LinksPage