var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.inventory = tswlairmgr.modules.inventory || {};

tswlairmgr.modules.inventory.viewNotes = function inventoryViewNotes(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this.observables = {
		notesModified: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		notes: {
			rootNode: null,
			title: null,
			infoText: null,
			textBox: null
		}
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewNotes>: build called");
		
		this._build_notes();
	};
	
	this._build_notes = function() {
		this._el.notes.rootNode = $("<div />")
			.attr("id", "notesBox")
			.addClass("uibox");
		$(this._el.self).append(this._el.notes.rootNode);
		
		var struct = $(
			'<div class="componentTitle"></div>' +
			'<div class="infoText"></div>' +
			'<div class="textBoxContainer">' +
			'	<textarea class="textBox" class="expand"></textarea>' +
			'</div>'
		);
		this._el.notes.rootNode.append(struct);
		
		this._el.notes.title = $(".componentTitle", this._el.notes.rootNode);
		this._el.notes.infoText = $(".infoText", this._el.notes.rootNode);
		this._el.notes.textBox = $(".textBoxContainer .textBox", this._el.notes.rootNode);
		
		var self = this;
		this._el.notes.textBox.on("input paste", function() {
			self.observables.notesModified.notify({
				notes: self._el.notes.textBox.val()
			});
		});
		this._el.notes.textBox.on("input propertychange keyup change", function() {
			// Hidden elements do not report their scrollHeight properly.
			// Temporarily make a visible clone of the textarea and measure *its* height to apply to the hidden original textarea.
			var testingBlock = $("<div />").attr("id", "textAreaHeightMeasure");
			$("body").append(testingBlock);
			
			$(testingBlock).append($(this).clone(false));
			var clonedTextarea = $("#textAreaHeightMeasure textarea");
			
			$(clonedTextarea).width($(this).width());
			$(clonedTextarea).val($(this).val());
			
			$(clonedTextarea).height(0).height($(clonedTextarea).prop("scrollHeight"));
			$(this).height($(clonedTextarea).height());
			
			$(testingBlock).remove();
			
		});
	};
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewNotes>: redraw called");
		
		this._redraw_notes();
	};
	
	this._redraw_notes = function() {
		var self = this;
		$(this._el.notes.title).html(
			self._localization.getLocalizationData().strings.notes.title
		);
		$(this._el.notes.infoText).html(
			self._localization.getLocalizationData().strings.notes.infoText
		);
		this._el.notes.textBox.val(this._model.getNotes()).change();
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewNotes>: got notified that module localization has changed.");
			self._redraw();
		});
		
		this._model.observables.notesChanged.registerCallback(function(origin, context) {
			self._el.notes.textBox.val(context.notes).change();
		});
	};
};