(function($){
	
	$.fn.previewForm = function(options){
		var form_settings = $.extend({
			identifier         : 'label',
			extratext    : 'Do You Want To submit',
			no	 : 'Back',
			yes	 : 'Submit',

			title	 : 'Preview'			
		}, options);
			var thisLabel;	
			var dia_log;	
			var renderBUTTON;
			var this_frm;
			this_frm = $(this);
		
	$(this).submit(function (){

	if($('#pfomdata').length){
						return true;
					}
		
		
		dia_log="";
		thisLabel="";
		var needle_cnfrm;
	
		if(this.id.length > 0){ needle_cnfrm = '#'+this.id+' label'; }
		else  { needle_cnfrm = '.'+$(this).attr('class')+' label'; }
		
	$(needle_cnfrm).each(function(i,val) { 
		if($(this).text().length >2){
			
	what_t= $('#'+$(this).attr('for')) ;
	
	switch(what_t.prop('type')){

	case 'select-one':
		thisLabel +=$(this).text()+"<br/>";

	dia_log +=": "+$('#'+$(this).attr('for')+' option:selected').text()+"<br/>";
		break;
	case 'radio':
	if( what_t.is(':checked'))
	thisLabel +=$(this).text()+"<br/>";

	dia_log +=' '+what_t.val()+"<br/>";
		break;
	case 'checkbox':
		thisLabel +=$(this).text()+"<br/>";

	if( what_t.is(':checked'))
	thisLabel +=$(this).text()+"<br/>";

	dia_log +=+": "+' '+what_t.val()+"<br/>";
		break;
	case 'undefined':
		break;
	default:
		thisLabel +=$(this).text()+"<br/>";

	dia_log +=": "+what_t.val()+"<br/>";
	break;
	
	}
	}
		});
		dia_log = dia_log.replace('undefined', '');
		
		
		renderBUTTON="";
		renderBUTTON += '<a href="javascript:void(0);" class="button form_yes">'+form_settings.yes+'<span></span></a>';
		renderBUTTON += '<a href="javascript:void(0);" class="button form_no">'+form_settings.no+'<span></span></a>';
		
		var renderTemplate = [
			'<div id="previewOverlay">',
			'<div id="previewBox">',
			'<h1>',form_settings.title,'</h1>',
			'<div id="insideText">',

			'<label>',thisLabel,'</label>'+'<p>',dia_log,'</p>',
			'</div>',
			'<h4>',form_settings.extratext,'<h4>',
			'<div id="previewButtons">',
			renderBUTTON,
			'</div></div></div>'
		].join('');
		
		$(renderTemplate).hide().appendTo('body').fadeIn();
		
	$(".form_yes") .click(function(){ 
			var input = $("<input>").attr("type", "hidden").attr("id", "pfomdata").val("true");
				this_frm.append($(input));
				this_frm.submit();
			});
			
	$(".form_no") .click(function(){
				$('#previewOverlay').fadeOut(function(){
				$(this).remove();
					});
			});
					
	return false;
			
		});
	}
	
})(jQuery);