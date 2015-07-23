var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules.sample = new function() {
	this.id = "sample";
	this._localization = new tswlairmgr.modules.ModuleLocalization();
	var self = this;
	this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
		console.log("<tswlairmgr.modules.sample>: got notified that localization has changed.");
		self.redraw();
	});
	
	this._el = {
		self: null,
		sampleText: null,
		localizationSwitcher: {
			rootNode: null,
			interface: {
				rootNode: null
			},
			module: {
				rootNode: null
			}
		}
	};
	
	this._templates = {
		sample:
			'{{localization.strings.sample_moduleContainerFor}} <b>{{context.name}}</b>',
		
		interface_switcher_title:
			'<u>{{localization.strings.interface_setInterfaceLocalization}}:</u>',
		module_switcher_title:
			'<u>{{localization.strings.module_setModuleLocalization}}:</u>'
	};
	
	this.getDisplayName = function() {
		return this._localization.getLocalizationData().meta.displayName;
	};
	
	this.initWithRootNode = function(contentNode) {
		console.log("<tswlairmgr.modules.sample>: initWithRootNode: initializing...");
		
		this._el.self = contentNode;
		
		this.init();
		
		this.redraw();
	};
	
	this.init = function() {
		console.log("<tswlairmgr.modules.sample>: init called");
		
		this._localization.init();
		
		this._el.sampleText = $("<div />")
			.css("margin-bottom", "5px");
		this._el.self.append(this._el.sampleText);
		
		this._el.localizationSwitcher.rootNode = $("<div />");
		
		// Interface localization switcher
		this._el.localizationSwitcher.interface.rootNode = $("<div />")
			.css("margin-bottom", "5px");
		this._el.localizationSwitcher.rootNode.append(this._el.localizationSwitcher.interface.rootNode);
		
		// Module localization switcher
		this._el.localizationSwitcher.module.rootNode = $("<div />")
			.css("margin-bottom", "5px");
		this._el.localizationSwitcher.rootNode.append(this._el.localizationSwitcher.module.rootNode);
		
		this._el.self.append(this._el.localizationSwitcher.rootNode);
	};
	
	this.redraw = function() {
		console.log("<tswlairmgr.modules.sample>: redraw called");
		
		// Sample Text
		$(this._el.sampleText).empty();
		$(this._el.sampleText).append(
			Mustache.render(this._templates.sample, { localization: this._localization.getLocalizationData(), context: {
					name: this.getDisplayName()
				}
			})
		);
		
		var self = this;
		
		// Interface localization switcher
		$(this._el.localizationSwitcher.interface.rootNode).empty();
		$(self._el.localizationSwitcher.interface.rootNode).append(
			$("<div />").append(
				Mustache.render(
					this._templates.interface_switcher_title, { localization: this._localization.getLocalizationData(), context:
						{}
					}
				)
			)
		);
		$.each(tswlairmgr.modules.getAllLocalizationIds(), function(index, id) {
			$(self._el.localizationSwitcher.interface.rootNode).append(
				self._createInterfaceLocalizationSwitchButton(id)
			);
		});
		
		// Module localization switcher
		$(this._el.localizationSwitcher.module.rootNode).empty();
		$(self._el.localizationSwitcher.module.rootNode).append(
			$("<div />").append(
		   		Mustache.render(
		   	        this._templates.module_switcher_title, { localization: this._localization.getLocalizationData(), context:
		   	        	{}
		   	        }
		   		)
			)
		);
		$.each(this._localization._sortedLocalizations, function(index, id) {
			$(self._el.localizationSwitcher.module.rootNode).append(
				self._createModuleLocalizationSwitchButton(id)
			);
		});
	};
	
	this._createInterfaceLocalizationSwitchButton = function(id) {
		var meta = tswlairmgr.modules.getAllLocalizationsMeta()[id];
		
		var self = this;
		
		var buttonNode = $(
			'<div class="button" style="display: inline-block; border: 1px solid #80c080; margin: 2px; background-color: #00c000; cursor: pointer;">' +
			'	<div class="buttonContent" style="padding: 2px;">' +
			'		'+meta.localName+' (<i>'+meta.globalName+'</i>)' +
			'	</div>' +
			'</div>'
		)
		.click(function(){
			console.log("<tswlairmgr.modules.sample>: interface <"+id+"> localization button clicked");
	
			if(tswlairmgr.modules.getLocalizationId() !== id)
			{
				tswlairmgr.modules.setLocalizationById(id);
			}
		});
		
		return buttonNode;
	};
	
	this._createModuleLocalizationSwitchButton = function(id) {
		var meta = this._localization._localizations[id];
		
		var self = this;
		
		var buttonNode = $(
			'<div class="button" style="display: inline-block; border: 1px solid #80c0c0; margin: 2px; background-color: #00c0c0; cursor: pointer;">' +
			'	<div class="buttonContent" style="padding: 2px;">' +
			'		'+meta.localName+' (<i>'+meta.globalName+'</i>)' +
			'	</div>' +
			'</div>'
		)
		.click(function(){
			console.log("<tswlairmgr.modules.sample>: module <"+id+"> localization button clicked");
			
			if(self._localization.getLocalizationId() !== id)
			{
				self._localization.setLocalizationById(id);
			}
		});
		
		return buttonNode;
	};
	
	this.becameActive = function() {
		console.log("<tswlairmgr.modules.sample>: got notified that module became active.");
	};
	
	this.becameInactive = function() {
		console.log("<tswlairmgr.modules.sample>: got notified that module became inactive.");
	};
	
	tswlairmgr.modules.registerModule(this);
};