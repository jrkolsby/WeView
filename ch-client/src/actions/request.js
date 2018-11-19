import req from 'superagent'

import {ACTIONS} from '.'
import {loading, error, success} from './nav'

const API_URL = "http://localhost:5000/api"

export const request = (action, successAction=success) => {
    return (dispatch, getState) => {
        dispatch(loading(1))
		req.post(API_URL)
            .send({
                ...action,
                list: getState().nav.list,
                user: getState().user.name,
                token: getState().user.token,
            }) 
            .type("form")
			.end((err, res) => {
                dispatch(loading(0))
                if (err) {
                    alert(err) 
                } else { 
                    if (res.body &&
                        res.body.type &&
                        res.body.payload) { 
                        switch(res.body.type) {
                            case ACTIONS.REQUEST_SUCCESS:
                                dispatch(success(res.body.payload)) 
                                break;

                            case ACTIONS.REQUEST_REJECT:
                                dispatch(error(res.body.payload))
                                break;
                            
                            case ACTIONS.REQUEST_ERROR:
                                dispatch(error(res.body.payload))
                                break;

                            default: break;
                        }
                    }
                }
            })
    }
}
