import fetch from 'isomorphic-fetch';

export const testAction = () => {
    return (dispatch) => {
        dispatch({
            type: '' //  Action before request
        });

        function requestOK(response) {
            return {
                type: '',
                payload: response
            }
        }

        function requestERR(response) {
            return {
                type: '',
                payload: response
            }
        }


        fetch('http://localhost/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                    dispatch(requestERR({}));
                }

                response.json().then(function (data) {
                    dispatch(requestOK(data));
                });
            })
    }
};
