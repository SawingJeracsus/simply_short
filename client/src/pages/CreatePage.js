import React, {useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

const CreatePage = () => {
    const history = useHistory()
    const {request} = useHttp()
    const [link, setLink] = useState('')

    const auth = useContext(AuthContext)
    
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

    const submitHandler = async event => {
        if(event.key === 'Enter'){
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }
    return(
        <div className = "row">
            <div className = "col s8 offset-s2" style = {{
                paddingTop: '2rem'
            }}>
                <div className="input-field">
                <input
                placeholder="Type a Link"
                id="link"
                type="text"
                value =  {link}
                onChange = {e => setLink(e.target.value)}
                className="validate yellow-input"
                onKeyPress = {submitHandler}
                />
                <label htmlFor="link">Link</label>
                </div>
            </div>
        </div>
    )
}
export default CreatePage