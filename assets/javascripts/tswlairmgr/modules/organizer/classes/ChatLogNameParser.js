var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.ChatLogNameParser = new function() {
	this._pattern = /^(?:\[\d{2}:\d{2}\] )?(?:\[[^\]]+\] )?\[(?:\*)?([^\]]+)\]: .+$/gm;
	
	this.getCharacterNamesFromChatLogExcerpt = function(chatLog)
	{
		var matchedNames = [];
		var matches;
		while(matches = this._pattern.exec(chatLog))
		{
			matchedNames.push(matches[1]);
		}
		return matchedNames;
	};
};