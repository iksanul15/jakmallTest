import { fetch } from "../utils";

// #example if you want to maintain same base url for all api
// const baseUrl = typeof document === "undefined" ? "http://example.com/api" : "/api";

// const getToken = async () => new Promise((resolve, reject)=>{
//     fetch( baseUrl + '/api-token/generate', 'GET', {} ).then(
//         res => {
//             resolve(res);
//         },
//         err => {
//             reject(err);
//         },
//     );
// })

const apiService = ( ) => ( next ) => ( action ) => {
    (async()=>{
        next({
            type: `${ action.type }_BEGIN`,
        });

        const result = next( action );
        if ( !action.meta || !action.meta.async ) {
            return result;
        }

        // #example if you want to fully maintain with redux
        // let token = localStorage.getItem('token');
        // let tokenDate = localStorage.getItem('tokenDate');
        // if(tokenDate === null || (new Date()).getTime() - (new Date(tokenDate)).getTime() > (12*60*60 * 1000) )
        //     token = '';
        // if(!token){
        //     token = await getToken().catch(err=>{});
        //     if(token !== ''){
        //         localStorage.setItem('token',token);
        //         localStorage.setItem('tokenDate', new Date());
        //     }
        // }

        // if(token === ''){
        //     handleErrors( "Something wrong happened", action, next );
        // }
        // else{

        //     const { path, method = "GET", body } = action.meta;

        //     if ( !path ) {
        //         throw new Error( `'path' not specified for async action ${ action.type }` );
        //     }

        //     const url = `${ baseUrl }${ path }`;

        //     return fetch( url, method, body, {
            // API_TOKEN and secret could from .env
        //         'API_TOKEN': token,
        //         'API_SECRET': 'example'
        //     } ).then(
        //         res => handleResponse( res, action, next ),
        //         err => handleErrors( err, action, next ),
        //     );
        // }

        const { url, method = "GET", body } = action.meta;

        // #set empty header due to for example
        return fetch( url, method, body, {} ).then(
                res => handleResponse( res, action, next ),
                err => handleErrors( err, action, next ),
            );
    })();
};

export default apiService;

function handleErrors( err, action, next ) {
    next( {
        type: `${ action.type }_FAILED`,
        payload: err,
        meta: action.meta,
    } );

    return Promise.reject( err );
}

function handleResponse( res, action, next ) {
    next( {
        type: `${ action.type }_COMPLETED`,
        payload: res,
        meta: action.meta,
    } );

    return res;
}
