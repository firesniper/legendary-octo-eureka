+function ()
{
console.log ( "angular:" , angular ) ;
var mdu_root = angular.module ( "mdu_root" , [] ) ;
console.log ( "mdu_root:" , mdu_root ) ;
var fn_getAjax = function ( params )
{
    params.reqInc = !params.reqInc || isNaN ( params.reqInc ) ? 0 : params.reqInc ; 
    if ( params.reqInc > 3 ) return ;
    var $http               = params.$http ;
    var $scope              = params.$scope ;
    var bol_isEmer          = params && params.bol_isEmer ? params.bol_isEmer : false ;
    var str_emerUrl         = params.pgp_docSerh.fnStr_getServEmerUrl 
    (
        {
            str_emerDir : "/emerData_ng/" 
        }
    ) ;
    var str_servWholeUri    = params.pgp_docSerh.fnStr_getServWholeUri () ;
    var reqInc              = params && params.reqInc  ? params.reqInc : 0 ;
    // var fn_cb               = params.fn_cb ;

    var str_servWholeUri_ngJsonp = str_servWholeUri 
                                    + ( str_servWholeUri.indexOf ( "?" ) > 0 ? 
                                    '&' : 
                                    '?' ) 
                                    + "jsonp=JSON_CALLBACK" ;
    var str_emerUrl_ngJsonp = str_emerUrl 
                                    + ( str_emerUrl.indexOf ( "?" ) > 0 ? 
                                    '&' : 
                                    '?' )
                                    + 'angular.callbacks._' + reqInc + '#' ;
    var str_servUri = bol_isEmer ? str_emerUrl_ngJsonp : str_servWholeUri_ngJsonp ;
    var fn_ajaxSucc = function ( params )
    {
            var json_data   = params.json_data ;
            var $scope      = params.$scope ;
            console.log ( "json_data:" , json_data ) ;
            $scope.json_data = json_data ;
            /*var postage = ( postage = jpgp_data.postage ) == 0 ? "免运费" : postage ;
            $scope.postage = postage ;*/
            console.log ( "$scope:" , $scope ) ;
            // fn_cb ( json_data ) ;
    } ;
    var fn_newAjax = function ( params )
    {
        if ( params.bol_isEmer ) 
        {
            $http.jsonp ( str_emerUrl )
            .success
            (
                function ( json_data , status , header , config ) 
                {
                    fn_ajaxSucc ( json_data ) ;
                } 
            ) ;
        } ;
    } ;
    $http.jsonp
    ( 
        // str_servWholeUri + '&jsonp=JSON_CALLBACK' 
        str_servUri
    )
    .success
    (
        function ( json_data )
        {
            // params.bol_isEmer = true ;
            if ( Object.bol_isNullJson ( json_data ) ) 
            {
                console.log ( "str_emerUrl:" , str_emerUrl ) ;
                params.bol_isEmer = true ;
                params.reqInc ++ ;
                fn_getAjax ( params ) ;
            } ;
            fn_ajaxSucc 
            ( 
                { 
                    json_data : json_data ,
                    $scope    : params.$scope 
                }
            ) ;
        }
    )
    .error
    (
        function ( err )
        {
            // if ( params.reqInc > 5 ) return ;

            console.log ( "err params:" , params ) ;
            /*$http.jsonp
            ( 
                str_emerUrl_ngJsonp 
                // str_servUri
            )
            .success
            (
                function ( json_data )
                {
                    fn_ajaxSucc ( json_data ) ;
                }
            )*/
            /*.error
            (
                function ( err )
                {
                    console.log ( "err:" , err ) ;
                }
            ) ;*/
            params.bol_isEmer = true ;
            params.reqInc ++ ;
            fn_getAjax ( params ) ;
            // fn_newAjax ( { bol_isEmer : true } ) ;

        }
    ) ;
    

} ;
mdu_root.provider
(
    "pvd_http" ,
    function ()
    {
        this.$get = function ()
        {
            return {
                fn_getAjax : fn_getAjax 
            }
        } ;
    }
) ;
mdu_root.controller
(
    "ctr-root" ,
    function ( $scope , pvd_http , $http )
    {
        console.log ( "pvd_http:" , pvd_http ) ;
        var pgp_docSerh = { scm : "malldata" , tbNamesStr : "shoe,overcoat" } ;
    	pgp_docSerh.fn_bootDocSerhExtendEnvState (  ) ;
        
        $scope.str_docSerh = window.pgp_envState.pgp_envOpt.str_docSerh ;
        /*var fnStr_getServEmerUrl = function ( params )
        {
            var str_emerDir    =   params && params.str_emerDir ? 
                                    params.str_emerDir : 
                                    pgp_envState.str_emerDir ;
            var str_tb = pgp_docSerh [ "tbNamesStr" ].split ( "," ) ;
            var str_emerUrl = pgp_envState.str_baseUrl + str_emerDir + "/" + str_tb [ 0 ] + ".js" ;
            return str_emerUrl ; 
        } ;*/

        
        pvd_http.fn_getAjax 
        ( 
            {
                $scope      : $scope ,
                $http       : $http ,
                pgp_docSerh : pgp_docSerh ,
                // bol_isEmer  : false 
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

} () ;
