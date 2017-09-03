+function (  )
{
    
    var mdu_root = angular.module ( "mdu_root" , [ "infinite-scroll" ] ) ;

    $ngSection.ngGetJson 
    (
        {
            pgp_docSerh     : 
            String.prototype.fnPgp_getDocSerh () ,
            str_getDataModeFlag : 0 ,
            mdu_root            : mdu_root

        }
        
    ) ;
    
    angular.element ( document ).ready  
    (
        function ( $ )
        {
            angular.bootstrap ( document , [ "mdu_root" ] ) ;

        }
    ) ;

} (  ) ;
