var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules.sample = new function() {
	this.id = "sample";
	this._localization = new tswlairmgr.modules.ModuleLocalization();
	var self = this;
	this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.sample>: got notified that localization has changed.");
		self._redraw();
	});
	
	this._templates = {
		sample:
			'<span style="font-size: 20px;">' +
			'	{{localization.strings.sampleText.moduleContainerFor}} <b>{{context.name}}</b>' +
			'</span>',
		
		dropdown_label:
			'{{localization.strings.persistentStateDropdown.dropdownWithPersistentState}}:',
		
		interface_switcher_title:
			'{{localization.strings.localizationSwitcher.interface.setInterfaceLocalization}}:',
		module_switcher_title:
			'{{localization.strings.localizationSwitcher.module.setModuleLocalization}}:',
		data_switcher_title:
			'{{localization.strings.localizationSwitcher.data.setDataLocalization}}:'
	};
	
	this._compactState = {
		v: 1,
		dd: "1"
	};
	
	this._appBackground = {
		savedSnapshot: null,
		module: "#404040 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAA+SURBVDjLY/j//z8DJZgyzQwMDZQawDTgLmAcdcEgcMHApwOWAXcBG4gQAJvEwMALpbmhNBeU5kCmYTbDaABkFrFGcnxtxwAAAABJRU5ErkJggg==) repeat center"
	};
	
	this._el = {
		self: null,
		sampleText: null,
		demoItems: {
			rootNode: null,
			fragments: {
				rootNode: null,
				fragments: []
			},
			summons: {
				rootNode: null,
				summons: []
			},
		},
		persistentStateDropdown: {
			rootNode: null,
			labelNode: null,
			dropdown: null
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
	
	this._demoItemControllers = {
		fragments: [],
		summons: []
	};
	
	this.getDisplayName = function() {
		return this._localization.getLocalizationData().meta.displayName;
	};
	
	this.initWithRootNode = function(contentNode) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.sample>: initWithRootNodeAndState: initializing...");
		
		this._el.self = contentNode;
		
		this._localization.init();
		
		this._build();
		
		var self = this;
		tswlairmgr.core.persistentstate.observables.hashLoaded.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.sample>: persistent state loaded, running deferred initialization");
			self._loadState(tswlairmgr.core.persistentstate.getModuleState(self));
			self._redraw();
		});
	};
	
	this.becameActive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.sample>: got notified that module became active.");
		
		// Save snapshot
		this._appBackground.savedSnapshot = $("body").css("background");
		// Set
		$("body").css("background", this._appBackground.module);
	};
	
	this.becameInactive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.sample>: got notified that module became inactive.");
		
		// Restore snapshot
		$("#webapp").css("background", this._appBackground.savedSnapshot);
	};
	
	this._getState = function() {
		return this._compactState;
	};
	
	this._updateState = function() {
		tswlairmgr.core.persistentstate.updateModuleState(this, this._compactState);
	};
	
	this._loadState = function(state) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.sample>: loadState =");
		if(tswlairmgr.core.config.debug) console.log(state);
		if(state)
		{
			if(state.v == this._getState().v)
			{
				if(state.dd && state.dd >= 1 && state.dd <= 5)
				{
					this._setPersistentStateDropdownState(state.dd);
				}
			}
		}
		this._updateState();
	};
	
	this._setPersistentStateDropdownState = function(val) {
		this._compactState.dd = val;
		$(this._el.persistentStateDropdown.dropdown).val(this._getState().dd);
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.sample>: init called");
		
		$(this._el.self).addClass("uibox");
		
		// Sample Text
		this._el.sampleText = $("<div />")
			.css("margin-bottom", "15px");
		this._el.self.append(this._el.sampleText);
		
		// Demo Items
		this._el.demoItems.rootNode = $("<div />");
		
		// Fragments
		this._el.demoItems.fragments.rootNode = $("<div />")
			.css("margin-bottom", "15px");
		
		var fragments = [
			{
				dataInstance:
					// LF: Theta 07
					tswlairmgr.core.data.struct.regions.tra.zones.bf.lairs[0].bosses[0].boss.getFragmentSet().getCFragment(),
				isSmall: false
			},
			{
				dataInstance:
					// RF: Alaph 04
					tswlairmgr.core.data.struct.regions.tra.regional.getFragmentSet().getNNEFragment(),
				isSmall: false
			},
			{
				dataInstance:
					// LF: Omicron 01
					tswlairmgr.core.data.struct.regions.sol.zones.bm.lairs[0].bosses[1].boss.getFragmentSet().getEFragment(),
				isSmall: true
			},
			{
				dataInstance:
					// RF: Lamadh 06
					tswlairmgr.core.data.struct.regions.sol.regional.getFragmentSet().getNWWFragment(),
				isSmall: true
			}
		];
		
		var self = this;
		$.each(fragments, function(index, compound) {
			var node = $("<div />")
				.css("display", "inline-block")
				.css("border", "1px solid #00ff00")
				.css("margin-right", "5px");
			
			self._demoItemControllers.fragments.push(
				new tswlairmgr.core.components.ItemHTML(
					compound.dataInstance,
					node,
					{
						isSmall: compound.isSmall
					}
				)
			);
			
			$(self._el.demoItems.fragments.rootNode).append(node);
			
			self._el.demoItems.fragments.fragments.push(node);
		});
		
		$(this._el.demoItems.rootNode).append(this._el.demoItems.fragments.rootNode);
		
		// Summons
		this._el.demoItems.summons.rootNode = $("<div />")
			.css("margin-bottom", "15px");
		
		var summons = [
			{
				dataInstance:
					// LS: Head of Glamr
					tswlairmgr.core.data.struct.regions.sol.zones.km.lairs[0].bosses[2].boss,
				isSmall: false
			},
			{
				dataInstance:
					// RS: Egypt
					tswlairmgr.core.data.struct.regions.egy.regional,
				isSmall: false
			},
			{
				dataInstance:
					// LS: Duneback
					tswlairmgr.core.data.struct.regions.egy.zones.cs.lairs[0].bosses[2].boss,
				isSmall: true
			},
			{
				dataInstance:
					// RS: Transylvania
					tswlairmgr.core.data.struct.regions.tra.regional,
				isSmall: true
			}
		];
		
		var self = this;
		$.each(summons, function(index, compound) {
			var node = $("<div />")
				.css("display", "inline-block")
				.css("border", "1px solid #00ff00")
				.css("margin-right", "5px");
			
			self._demoItemControllers.summons.push(
				new tswlairmgr.core.components.ItemHTML(
					compound.dataInstance,
					node,
					{
						isSmall: compound.isSmall
					}
				)
			);
			
			$(self._el.demoItems.summons.rootNode).append(node);
			
			self._el.demoItems.summons.summons.push(node);
		});
		
		$(this._el.demoItems.rootNode).append(this._el.demoItems.summons.rootNode);
		
		this._el.self.append(this._el.demoItems.rootNode);
		
		// Persistent state dropdown
		this._el.persistentStateDropdown.rootNode = $("<div />")
			.css("margin-bottom", "15px");
			
		this._el.persistentStateDropdown.labelNode = $("<div />");
		this._el.persistentStateDropdown.rootNode.append(this._el.persistentStateDropdown.labelNode);
		
		var self = this;
		this._el.persistentStateDropdown.dropdown = $("<select>")
			.attr("size", 1)
			.change(function() {
				self._getState().dd = $(this).val();
				self._updateState();
			});
		var i;
		var node;
		for(i=1; i<=5; i++)
		{
			node = $("<option>")
				.attr("value", i)
				.text(i);
			this._el.persistentStateDropdown.dropdown.append(node);
		}
		this._el.persistentStateDropdown.rootNode.append(this._el.persistentStateDropdown.dropdown);
		
		this._el.self.append(this._el.persistentStateDropdown.rootNode);
		
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
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.sample>: redraw called");
		
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
		
		// Persistent state dropdown
		$(this._el.persistentStateDropdown.labelNode).empty();
		$(this._el.persistentStateDropdown.labelNode).append(
			Mustache.render(
				this._templates.dropdown_label, { localization: this._localization.getLocalizationData(), context:
					{}
				}
			)
		);
		
		// Interface localization switcher
		$(this._el.localizationSwitcher.interface.rootNode).empty();
		$(this._el.localizationSwitcher.interface.rootNode).append(
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
		$(this._el.localizationSwitcher.module.rootNode).append(
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
		$(this._el.localizationSwitcher.data.rootNode).append(
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
	
	this._createInterfaceLocalizationSwitchButton = function(id) {
		return this._createLocalizationSwitchButton(
			'#80c080', // Border
			'#00c000', // Background
			tswlairmgr.modules.getAllLocalizationsMeta()[id],
			function() {
				if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.sample>: interface <"+id+"> localization button clicked");

				tswlairmgr.modules.setLocalizationById(id);
			}
		);
	};
	
	this._createModuleLocalizationSwitchButton = function(id) {
		return this._createLocalizationSwitchButton(
			'#80c0c0', // Border
			'#00c0c0', // Background
			this._localization._localizations[id],
			function() {
				if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.sample>: module <"+id+"> localization button clicked");

				self._localization.setLocalizationById(id);
			}
		);
	};
	
	this._createDataLocalizationSwitchButton = function(id) {
		return this._createLocalizationSwitchButton(
			'#c08080', // Border
			'#c00000', // Background
			tswlairmgr.core.data.getAllLocalizationsMeta()[id],
			function() {
				if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.sample>: data <"+id+"> localization button clicked");

				tswlairmgr.core.data.setLocalizationById(id);
			}
		);
	};
	
	this._createLocalizationSwitchButton = function(borderColorHex, backgroundColorHex, meta, callback) {
		var self = this;
		
		var buttonNode = $(
			'<div class="button" style="display: inline-block; border: 1px solid '+borderColorHex+'; border-radius: 4px; margin: 2px; background-color: '+backgroundColorHex+'; cursor: pointer;">' +
			'	<div class="buttonContent" style="padding: 3px 6px 3px 6px;">' +
			'		'+meta.localName+' (<i>'+meta.globalName+'</i>)' +
			'	</div>' +
			'</div>'
		)
		.click(function(){
			callback.call();
		});
		
		return buttonNode;
	}
	
	tswlairmgr.modules.registerModule(this);
};