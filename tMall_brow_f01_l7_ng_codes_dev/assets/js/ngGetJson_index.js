console.log ( "angular:" , angular ) ;
var mdu_root = angular.module ( "mdu_root" , [] ) ;
console.log ( "mdu_root:" , mdu_root ) ;
mdu_root.controller
(
    "ctr-root" ,
    function ( $scope , $http )
    {
        var pgp_docSerh = { scm : "malldata" , tbNamesStr : "shoe,overcoat" } ;

        var str_servWholeUri = pgp_docSerh.fnStr_getWholeUri () ;
        var fnStr_getEmerUrl = function ()
        {
            var str_tb = pgp_docSerh [ "tbNamesStr" ].split ( "," ) ;
            var str_emerUrl = pgp_envState.str_baseUrl + str_emer_dir + "/" + str_tb [ 0 ] + ".js" ;
            return str_emerUrl ; 
        } ;
        
        $http.jsonp
        ( str_servWholeUri + '&jsonp=JSON_CALLBACK' )
        .success
        (
            function ( json_data )
            {
                if ( Object.isNullJson ( json_data ) ) 
                {
                    fnStr_getEmerUrl ()
                } ;
                console.log ( "json_data:" , json_data ) ;
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