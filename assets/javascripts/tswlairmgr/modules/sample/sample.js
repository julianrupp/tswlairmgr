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
		demoFragments: {
			rootNode: null,
			fragments: [
				null,
				null,
				null
			]
		},
		localizationSwitcher: {
			rootNode: null,
			interface: {
				rootNode: null
			},
			module: {
				rootNode: null
			},
			data: {
				rootNode: null
			}
		}
	};
	
	this._demoFragmentControllers = [
		null,
		null,
		null
	];
	
	this._templates = {
		sample:
			'<span style="font-size: 20px;">' +
			'	{{localization.strings.sampleText.moduleContainerFor}} <b>{{context.name}}</b>' +
			'</span>',
		
		interface_switcher_title:
			'{{localization.strings.localizationSwitcher.interface.setInterfaceLocalization}}:',
		module_switcher_title:
			'{{localization.strings.localizationSwitcher.module.setModuleLocalization}}:',
		data_switcher_title:
			'{{localization.strings.localizationSwitcher.data.setDataLocalization}}:'
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
		
		$(this._el.self).addClass("uibox");
		
		// Sample Text
		this._el.sampleText = $("<div />")
			.css("margin-bottom", "15px");
		this._el.self.append(this._el.sampleText);
		
		// Demo Fragments
		
		// Big lair fragment Omicron 01
		this._el.demoFragments.rootNode = $("<div />")
			.css("margin-bottom", "15px");
		
		this._el.demoFragments.fragments[0] = $("<div />")
			.css("display", "inline-block");
		this._demoFragmentControllers[0] = new tswlairmgr.core.components.FragmentHTML(
			tswlairmgr.core.data._struct.regions.sol.zones.bm.lairs[0].bosses[1].boss.getFragmentSet().getEFragment(),
			this._el.demoFragments.fragments[0]
		);
		this._el.demoFragments.rootNode.append(this._el.demoFragments.fragments[0]);
		
		// Big regional fragment Aleph 04
		this._el.demoFragments.fragments[1] = $("<div />")
			.css("display", "inline-block");
		this._demoFragmentControllers[1] = new tswlairmgr.core.components.FragmentHTML(
			tswlairmgr.core.data._struct.regions.tra.regional.getFragmentSet().getNNEFragment(),
			this._el.demoFragments.fragments[1]
		);
		this._el.demoFragments.rootNode.append(this._el.demoFragments.fragments[1]);
		
		// Small lair fragment Theta 07
		this._el.demoFragments.fragments[2] = $("<div />")
			.css("display", "inline-block");
		this._demoFragmentControllers[2] = new tswlairmgr.core.components.FragmentHTML(
			tswlairmgr.core.data._struct.regions.tra.zones.bf.lairs[0].bosses[0].boss.getFragmentSet().getCFragment(),
			this._el.demoFragments.fragments[2],
			true // small
		);
		this._el.demoFragments.rootNode.append(this._el.demoFragments.fragments[2]);
		
		this._el.self.append(this._el.demoFragments.rootNode);
		
		// Localization switcher
		this._el.localizationSwitcher.rootNode = $("<div />");
		
		// Interface localization switcher
		this._el.localizationSwitcher.interface.rootNode = $("<div />")
			.css("margin-bottom", "5px");
		this._el.localizationSwitcher.rootNode.append(this._el.localizationSwitcher.interface.rootNode);
		
		// Module localization switcher
		this._el.localizationSwitcher.module.rootNode = $("<div />")
			.css("margin-bottom", "5px");
		this._el.localizationSwitcher.rootNode.append(this._el.localizationSwitcher.module.rootNode);
		
		// Data localization switcher
		this._el.localizationSwitcher.data.rootNode = $("<div />")
			.css("margin-bottom", "5px");
		this._el.localizationSwitcher.rootNode.append(this._el.localizationSwitcher.data.rootNode);
		
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
		
		// Demo Fragments
		// Will redraw themselves.
		
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
		
		// Module localization switcher
		$(this._el.localizationSwitcher.data.rootNode).empty();
		$(self._el.localizationSwitcher.data.rootNode).append(
			$("<div />").append(
		   		Mustache.render(
		   	        this._templates.data_switcher_title, { localization: this._localization.getLocalizationData(), context:
		   	        	{}
		   	        }
		   		)
			)
		);
		$.each(tswlairmgr.core.data.getAllLocalizationIds(), function(index, id) {
			$(self._el.localizationSwitcher.data.rootNode).append(
				self._createDataLocalizationSwitchButton(id)
			);
		});
	};
	
	this._createLocalizationSwitchButton = function(borderColorHex, backgroundColorHex, meta, callback) {
		var self = this;
		
		var buttonNode = $(
			'<div class="button" style="display: inline-block; border: 1px solid '+borderColorHex+'; margin: 2px; background-color: '+backgroundColorHex+'; cursor: pointer;">' +
			'	<div class="buttonContent" style="padding: 2px;">' +
			'		'+meta.localName+' (<i>'+meta.globalName+'</i>)' +
			'	</div>' +
			'</div>'
		)
		.click(function(){
			callback.call();
		});
		
		return buttonNode;
	}
	
	this._createInterfaceLocalizationSwitchButton = function(id) {
		return this._createLocalizationSwitchButton(
			'#80c080', // Border
			'#00c000', // Background
			tswlairmgr.modules.getAllLocalizationsMeta()[id],
			function() {
				console.log("<tswlairmgr.modules.sample>: interface <"+id+"> localization button clicked");

				if(tswlairmgr.modules.getLocalizationId() !== id)
				{
					tswlairmgr.modules.setLocalizationById(id);
				}
			}
		);
	};
	
	this._createModuleLocalizationSwitchButton = function(id) {
		return this._createLocalizationSwitchButton(
			'#80c0c0', // Border
			'#00c0c0', // Background
			this._localization._localizations[id],
			function() {
				console.log("<tswlairmgr.modules.sample>: module <"+id+"> localization button clicked");

				if(self._localization.getLocalizationId() !== id)
				{
					self._localization.setLocalizationById(id);
				}
			}
		);
	};
	
	this._createDataLocalizationSwitchButton = function(id) {
		return this._createLocalizationSwitchButton(
			'#c08080', // Border
			'#c00000', // Background
			tswlairmgr.core.data.getAllLocalizationsMeta()[id],
			function() {
				console.log("<tswlairmgr.modules.sample>: data <"+id+"> localization button clicked");

				if(tswlairmgr.core.data.getLocalizationId() !== id)
				{
					tswlairmgr.core.data.setLocalizationById(id);
				}
			}
		);
	};
	
	this.becameActive = function() {
		console.log("<tswlairmgr.modules.sample>: got notified that module became active.");
	};
	
	this.becameInactive = function() {
		console.log("<tswlairmgr.modules.sample>: got notified that module became inactive.");
	};
	
	tswlairmgr.modules.registerModule(this);
};