// window.$getJsonSearch = { "sadf" : "asdfsf"} ;

(function( $ )
{
	"use strict" ;

	var fnStr_defGetDomPatt = function ( params )
	{
		var jary_data		= params.jary_data ;
		var str_dataKey		= params.str_dataKey ;
		var str_pgKey		= params.str_pgKey ;

		var ary_data_pgp = jary_data[ str_dataKey ] ;
		var str_search = location.search ;

		/*$( document ).on(
			"pageInit" ,
			function ( e , pageId , $page ) 
			{
				if ( pageId == "detail-page" )
				{
					console.log( "pageId:" , pageId ) ;
					// console.log( "$page:" , $page[ 0 ].parentNode ) ;
				} ;
			} 
		) ;*/
		
		var str_postage = ( str_postage = ary_data_pgp.str_postage ) == 0 ? "免运费" : str_postage ;
		var str_domTemp = 
				   '<li>'
                  +'    <div class="item-content list-item">'
                  +'        <div class="p">'
                  +'            <a href=" ' + document.baseURI + 'detail/' + str_search + "&key=" + key + ' " title="">'
                  +'                <img class="p-pic" src=" ' + ary_data_pgp.link + ' " style="visibility: visible;">'
                  +'                <span class="flag c-icon-pt"></span>'
                  +'              </a>'
                  +'        </div>'
                  +'        <div class="d">'
                  +'            <a href=" ' + document.baseURI + 'home/goods-detail.html' + str_search + "&key=" + key + ' " title="">'
                  +'                <h3 class="d-title">  ' + ary_data_pgp.title + ' </h3>'
                  +'            </a>'
                  +'            <p class="d-price">'
                  +'                <em class="h">'
                  +'                    <span class="price-icon">¥</span>'
                  +'                    <span class="font-num"> ' + ary_data_pgp.price_integer + ' </span>'
                  +'                </em>'
                  +'                <del></del>'
                  +'            </p>'
                  +'            <div class="d-main">'
                  +'                <p class="d-freight"> ' + str_postage + ' </p>'
                  +'                <p class="d-num">'
                  +'				   <span class="font-num"> ' + ary_data_pgp.sales + ' </span>人付款'
                  +'				</p>'
                  +'                <p class="d-area"> ' + ary_data_pgp.delivery + ' </p>'
                  +'            </div>'
                  +'        </div>'
                  +'    </div>'
                  +'    <div class="icons-group"></div>'
                  +'</li>' ;
      	return str_domTemp ;

	} ;

	
	function fn_getAjax (  params )
	{
		var pgp_docSerh			=   params.pgp_docSerh ;
		 
		var qad_anchor			=   params.qad_anchor ;
		var fnStr_getDomPatt =   params.fnStr_getDomPatt ? 
									params.fnStr_getDomPatt : 
									params.fnStr_getDomPatt === null ?
									params.fnStr_getDomPatt :
									params.fnStr_defGetDomPatt ;
		/*var fn_cb				=   params.fn_cb ? 
									params.fn_cb : 
									params.fn_cb === null ? 
									function () { return } : 
									fn_defCb ; */
		var $page				=   params.$page ;
		var str_sortType		=   params && params.str_sortType ? params.str_sortType : "_bid" ;

		
		var str_pgKey = pgp_docSerh [ "pgKey" ] ;
		
		params.reqInc = !params.reqInc || isNaN ( params.reqInc ) ? 0 : params.reqInc ; 
		if ( params.reqInc > 5 ) return ;
		var bol_isEmer          = params && params.bol_isEmer ? params.bol_isEmer : false ;
		var str_emerUrl         = params.pgp_docSerh.fnStr_getServEmerUrl () ;
		var reqInc              = params && params.reqInc  ? params.reqInc : 0 ;

		var str_servWholeUri = pgp_docSerh.fnStr_getServWholeUri () ;
		var str_servUri = bol_isEmer ? str_emerUrl : str_servWholeUri ;
		var fn_ajaxSucc = function ( json_data )
		{
			// $.init() ;
			console.log( "json_data" , json_data ) ;
			
			
			
			var jary_conData = json_data.fnJary_concatJa () ;
			jary_conData.fn_JaSortByType
			( 
				Object.pgp_jaTypeSerhMap [ str_sortType ] 
			) ;
			var jary_data = !isNaN( str_pgKey ) && str_pgKey != undefined && str_pgKey != null && str_pgKey !== "" ? 
							new Array ( jary_conData[ str_pgKey ] ) 
							: 
						jary_conData ;

			jary_data.fnPgp_setIndex () ;
			var ary_subRetData = jary_data.splice ( 0 , 6 ) ;

			var str_domTemp = $tMallCompo.fnStr_getDomTemp
			( 
				{
					// jary_data		: jary_data , 
					fnStr_getDomPatt			: fnStr_getDomPatt , 
					/*num_startIdx	: 0 , 
					num_len			: 6 , */
					// str_pgKey		: str_pgKey ,
					ary_subRetData	: ary_subRetData  

				}
			) ;

			qad_anchor.append ( str_domTemp ) ;
			// fn_cb( jary_data , qad_anchor , fnStr_getDomPatt , $page ) ;
			$tMallCompo.fn_pgInfi 
			( 
				{
					// pgp_reduceData		: pgp_data.pgp_reduceData , 
					jary_reduceData		: jary_data ,
					dom_dom				: $page , 
					qad_anchor			: qad_anchor , 
					fnStr_getDomPatt : fnStr_getDomPatt , 
					// str_pgKey			: str_pgKey 
					
				}
			) ;
			// $.init() ;
		} ;
		$.ajax
		(
			{
				// url : "http://localhost:8081/mall_a01/overcoat?" ,
				url				: str_servUri ,
				crossDomain 	: true ,
				type			: "get" ,
				dataType		: "jsonp" ,
				mimeType		: "text/javascript" ,
				scriptCharSet	: "utf-8" ,
				jsonp 			: "jsonp" ,
				jsonpCallback 	: "mSearchjsonp" + ( pgp_docSerh [ "scm" ] + 1 ) ,
				success 		: function ( json_data )
				{
					if ( Object.bol_isNullJson ( json_data ) ) 
					{
						$.toast( "暂无数据" ) ;
						console.log ( "str_emerUrl:" , str_emerUrl ) ;
						params.bol_isEmer = true ;
						params.reqInc ++ ;
						fn_getAjax ( params ) ;
					} ;
					fn_ajaxSucc ( json_data ) ;
				} ,
				error : function ( XMLHttpRequest, textStatus, errorThrown )
				{
					console.log( "XMLHttpRequest:" , XMLHttpRequest ) ;
					console.log( "textStatus:" , textStatus ) ;
					console.log( "errorThrown:" , errorThrown ) ;
					$.ajax
					(
						{
							// url : "http://localhost:8081/mall_a01/overcoat?" ,
							url				: str_servUri ,
							crossDomain 	: true ,
							type			: "get" ,
							dataType		: "jsonp" ,
							mimeType		: "text/javascript" ,
							scriptCharSet	: "utf-8" ,
							jsonp 			: "jsonp" ,
							jsonpCallback 	: "mSearchjsonp" + ( pgp_docSerh [ "scm" ] + 1 ) ,
							success 		: function ( json_data )
							{
								fn_ajaxSucc ( json_data ) ;
							} ,
						}
					) ;
					params.bol_isEmer = true ;
                    params.reqInc ++ ;
                    fn_getAjax ( params ) ;
				} ,
			}
		) ;
	} ;
	
// 	$( document ).on(
// 		"pageInit" ,
// 		function ( e , pageId , $page )
// 		{
// 			console.log( "e:" , e ) ;
// 			if 
// 			( pageId == "page-infinite-scroll" )
// 			{
// 				// console.log( "pageId:" , pageId ) ;
// 				// var pgp_docSerh = String.prototype.fnPgp_getDocSerh() ;
// 				// console.log( "pgp_docSerh:" , pgp_docSerh );
// 				// fn_getAjax( pgp_docSerh , Object.keys( pgp_docSerh )[ 0 ] , true ) ;
			
// 			} ;
// 		} 
// 	) ;


	var getJsonSearch = 
	{
		fn_getAjax : fn_getAjax ,
	} ;

	Object.defineProperties (
		window ,
		{
			"$getJsonSearch" : 
			{
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value : getJsonSearch ,
			} ,
		} 
		
	) ;

	// $.init() ;
	// location.reload() ;
})( $ ) ;
console.log( "getJson-search.js" ) 
// $.init() ;