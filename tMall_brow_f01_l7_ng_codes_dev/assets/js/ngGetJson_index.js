console.log ( "angular:" , angular ) ;
var mdu_root = angular.module ( "mdu_root" , [] ) ;
console.log ( "mdu_root:" , mdu_root ) ;
mdu_root.controller
(
    "ctr-root" ,
    function ( $scope , $http )
    {
        var pgp_docSerh = { scm : "malldata" , tbNamesStr : "shoe,overcoat" } ;

        /*var fnStr_getEmerUrl = function ( params )
        {
            var str_emerDir    =   params && params.str_emerDir ? 
                                    params.str_emerDir : 
                                    pgp_envState.str_emerDir ;
            var str_tb = pgp_docSerh [ "tbNamesStr" ].split ( "," ) ;
            var str_emerUrl = pgp_envState.str_baseUrl + str_emerDir + "/" + str_tb [ 0 ] + ".js" ;
            return str_emerUrl ; 
        } ;*/
        var getAjax = function ( params )
        {
            params.reqInc = !params.reqInc || isNaN ( params.reqInc ) ? 0 : params.reqInc ; 
            if ( params.reqInc > 5 ) return ;
            var bol_isEmer          = params.bol_isEmer ? params.bol_isEmer : false ;
            var str_emerUrl         = params.pgp_docSerh.fnStr_getEmerUrl () ;
            var str_servWholeUri    = params.pgp_docSerh.fnStr_getWholeUri () ;
            var reqInc              = params.reqInc  ? params.reqInc : 0 ;

            var str_normalUri = str_servWholeUri + '&jsonp=JSON_CALLBACK' ;
            var str_servUri = bol_isEmer ? str_emerUrl : str_normalUri ;
            $http.jsonp
            ( 
                // str_servWholeUri + '&jsonp=JSON_CALLBACK' 
                str_servUri
            )
            .success
            (
                function ( json_data )
                {
                    if ( Object.bol_isNullJson ( json_data ) ) 
                    {
                        console.log ( "str_emerUrl:" , str_emerUrl ) ;
                        params.bol_isEmer = true ;
                        params.reqInc ++ ;
                        // arguments.callee ( params ) ;
                    } ;
                    console.log ( "json_data:" , json_data ) ;
                }
            )
            .error
            (
                function ( err )
                {
                    // if ( params.reqInc > 5 ) return ;

                    console.log ( "err params:" , params ) ;

                    params.bol_isEmer = true ;
                    params.reqInc ++ ;
                    console.log () ;
                    getAjax ( params ) ;

                }
            ) ;

        } ;
        getAjax 
        ( 
            {
                pgp_docSerh : pgp_docSerh ,
                bol_isEmer  : true 
            } 
        ) ;
    }
) ; 
angular.element ( document ).ready  
(
    function ( $ )
    {
        angular.bootstrap ( document , [ "mdu_root" ] ) ;

    }
) ;