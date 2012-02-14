(function($){

	function MainScreen(){};
  
	// --------- Component Interface Implementation ---------- //
	MainScreen.prototype.create = function(data,config){
		return $("#tmpl-MainScreen").render();
	}
	
	MainScreen.prototype.init = function(data,config){
		var c = this;
		var $e = this.$element;
		
		c.refresh();
	}
	
	MainScreen.prototype.refresh = function(data,config){
		var c = this;
		var $e = this.$element;
		var $list = $e.find(".list");
		$list.empty();
		brite.dm.list("tag").done(function(tags){
			for(var i = 0; i < tags.length; i++){
				var $listItem = $("#tmpl-listItem").render(tags[i]);
				$list.append($listItem);
			}
		});
		
		$e.find("input[name='tagName']").val("");
	}
		
	MainScreen.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		
		$e.find(".btn.btnAdd").click(function(){
			var name = $e.find("input[name='tagName']").val();
			var tag = {};
			tag.name = name;
			if(name != ""){
				brite.dm.create("tag",tag).done(function(){
					c.refresh();
				});
			}
		});
		
		$e.delegate(".btn.btnDelete","click",function(){
			var obj = $(this).bObjRef();
			brite.dm.remove("tag",obj.id).done(function(){
				c.refresh();
			});
		});
		
		$e.delegate(".btn.btnEdit:not(:disabled)","click",function(){
			$(this).attr("disabled",true);
			var obj = $(this).bObjRef();
			var $item = $(this).closest(".listItem");
			var $name = $item.find(".name");
			brite.dm.get("tag",obj.id).done(function(tag){
				var $input = $($("#tmpl-listItemEdit").render(tag));
				$name.html($input);
				$input.bind("blur",function(){
					$input.unbind("blur");
					if($input.val()!=""){
						var tagObj = {name:$input.val()};
						brite.dm.update("tag",obj.id,tagObj).done(function(){
							c.refresh();
						});
					}
				});
			});
		});
		
		
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Registration --------- //
	brite.registerComponent("MainScreen",{
        parent: "#page",
        emptyParent: true,
        loadTemplate:true
    },function(){
        return new MainScreen();
    });
	// --------- /Component Registration --------- //
	
	
})(jQuery);