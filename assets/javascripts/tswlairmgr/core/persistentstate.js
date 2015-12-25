var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};

tswlairmgr.core.persistentstate = new function() {
	this._lastHash = null;
	this._currentlyChangingHash = false;
	
	this._coreStateData = {
		activeLocalization: null,
		activeModule: null
	};
	this._moduleStateStruct = {
		v: tswlairmgr.core.info.version,
		m: {}
	};
	
	this.observables = {
		hashLoaded: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._hashData = function(hash) {
		return (hash.charAt(0) == "#") ? hash.substring(1) : hash;
	};
	
	this._loadStateFromHash = function(hash) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: loadStateFromHash called");
		
		var data = this._hashData(hash);
		
		var blocks = data.split(":");
		
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: loadStateFromHash: trying to set localization to <"+blocks[0]+">...");
		tswlairmgr.modules.setInterfaceAndDataLocalizationById(blocks[0]);
		tswlairmgr.modules._redrawLocalizationMenu();
		
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: loadStateFromHash: trying to set active module to <"+blocks[1]+">...");
		tswlairmgr.modules.setActiveModuleById(blocks[1]);
		
		this._loadModuleStateFromHash(blocks[2]);
		
		this._stateChanged();
		
		this.observables.hashLoaded.notify({});
	};
	
	this._loadModuleStateFromHash = function(packedModuleState) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: loadModuleStateFromHash called");
		
		if(!packedModuleState || packedModuleState.length === 0 || packedModuleState.indexOf(".") === -1)
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: loadModuleStateFromHash: warning: empty or invalid module state hash!");
			return;
		}
		
		var parts = packedModuleState.split(".");
		var encodedCompressedStringifiedData = parts[0];
		var claimedChecksum = parts[1];
		
		var compressedStringifiedData = tswlairmgr.core.helpers.Base64URL.decode(encodedCompressedStringifiedData);
		
		var actualChecksum = tswlairmgr.core.helpers.CRC32.textChecksum(compressedStringifiedData);
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: loadModuleStateFromHash: data checksum is <"+actualChecksum+">");
		
		var parsed;
		
		if(actualChecksum !== claimedChecksum)
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: loadModuleStateFromHash: warning: invalid checksum <"+claimedChecksum+">!");
		}
		else
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: loadModuleStateFromHash: trying to decompress and parse JSON...");
			try
			{
				parsed = JSON.parse(lzw_decode(compressedStringifiedData));
				
				if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: loadModuleStateFromHash: data loaded.");
				this._moduleStateStruct.m = parsed.m;
			}
			catch(e)
			{
				if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: loadModuleStateFromHash: warning: invalid data!");
			}
		}
	};
	
	this.getModuleState = function(module) {
		var moduleId = module.id;
		
		return this._moduleStateStruct.m[moduleId];
	};
	
	this.updateActiveLocalizationId = function(newId) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: updateActiveLocalizationId: to <"+newId+">");
		this._coreStateData.activeLocalization = newId;
		this._stateChanged();
	};
	
	this.updateActiveModuleId = function(newId) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: updateActiveModuleId: to <"+newId+">");
		this._coreStateData.activeModule = newId;
		this._stateChanged();
	};
	
	this.updateModuleState = function(module, newState) {
		var moduleId = module.id;
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: updateModuleState called from <"+moduleId+">");
		
		this._moduleStateStruct.m[moduleId] = newState;
		this._stateChanged();
	};
	
	this._stateChanged = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: stateChanged called");
		var newHash = this.hashify();
		this._setHash(newHash);
	};
	
	var self = this;
	this._setHash = function(string) {
		var hash = self._hashData(string);
		
		self._currentlyChangingHash = true;
		self._lastHash = hash;
		
		if("replaceState" in window.history)
		{
			window.history.replaceState(undefined, undefined, "#"+hash)
		}
		else
		{
			window.location.replace("#"+hash);
		}
		
		self._currentlyChangingHash = false;
		
		// Bugfix for FF: Disappearing favicon on window.location change
		$("link[rel*=icon]", $("head")).detach().appendTo($("head"));
	};
	
	this.pollHashChange = function() {
		var currentHash = self._hashData(window.location.hash);
		if(!self._currentlyChangingHash && self._lastHash !== currentHash)
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.persistentstate>: pollHashChange: User hash change detected.");
			self._loadStateFromHash(currentHash);
		}
		
		if(!("onhashchange" in window))
		{
			window.setTimeout(self.pollHashChange, 100);
		}
	};
	
	this.hashify = function() {
		var hash = this._coreStateData.activeLocalization + ":" +
			this._coreStateData.activeModule + ":" +
			this.hashifyModuleState();
		
		return hash;
	};
	
	this.hashifyModuleState = function() {
		var compressedStringifiedData = lzw_encode(JSON.stringify(this._moduleStateStruct));
		var textChecksum = tswlairmgr.core.helpers.CRC32.textChecksum(compressedStringifiedData);
		
		var encodedCompressedStringifiedData = tswlairmgr.core.helpers.Base64URL.encode(compressedStringifiedData);
		var packedDataWithChecksum = encodedCompressedStringifiedData + "." + textChecksum;
		
		return packedDataWithChecksum;
	};
	
	this._initWithHash = function(hash) {
		this._loadStateFromHash(hash);
		
		var self = this;
		if("onhashchange" in window)
		{
			$(window).bind("hashchange", function(){
				self.pollHashChange();
			});
		}
		else
		{
			$(document).ready(function(){
				self.pollHashChange();
			});
		}
	};
};