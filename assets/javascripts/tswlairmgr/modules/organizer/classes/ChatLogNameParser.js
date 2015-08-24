var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.ChatLogNameParser = new function() {
	/* ----------
	All matched patterns:
	----------

	## 26 lines following ##
	[#channel] [*Character-ChEx]: x
	[#channel] [Character-ChLo]: x
	[*Character-Ex]: x
	[Character-Lo]: x
	To [Character-WhtEN]: x
	An [Character-WhtDE]: x
	À [Character-WhtFR]: x
	[*Character-ExShtEN] shouts: x
	[Character-LoShtEN] shouts: x
	[*Character-ExShtDE] ruft:x
	[Character-LoShtDE] ruft:x
	[*Character-ExShtFR] crie :x
	[Character-LoShtFR] crie :x
	[11:22] [#channel] [*Character-TiChEx]: x
	[11:22] [#channel] [Character-TiChLo]: x
	[11:22] [*Character-TiEx]: x
	[11:22] [Character-TiLo]: x
	[11:22] To [Character-TiWhtEN]: x
	[11:22] An [Character-TiWhtDE]: x
	[11:22] À [Character-TiWhtFR]: x
	[11:22] [*Character-TiExShtEN] shouts: x
	[11:22] [Character-TiLoShtEN] shouts: x
	[11:22] [*Character-TiExShtDE] ruft:x
	[11:22] [Character-TiLoShtDE] ruft:x
	[11:22] [*Character-TiExShtFR] crie :x
	[11:22] [Character-TiLoShtFR] crie :x
	*/
	
	this._pattern = /^(?:\[\d{2}:\d{2}\] )?(?:(?:(?:\[[^\]]+\] )?\[(?:\*)?([^\]]+)\]: .+)|(?:(?:To|An|À) (?:\[(?:\*)?([^\]]+)\]): .+)|(?:\[(?:\*)?([^\]]+)\] (?:shouts: |ruft:|crie :).+))$/gm;
	
	this.getCharacterNamesFromChatLogExcerpt = function(chatLog)
	{
		var matchedNames = [];
		var matches;
		while(matches = this._pattern.exec(chatLog))
		{
			if(matches[1]) // Normal messages & whisper from
			{
				matchedNames.push(matches[1]);
			}
			else if(matches[2]) // Whisper to
			{
				matchedNames.push(matches[2]);
			}
			else if(matches[3]) // Shout
			{
				matchedNames.push(matches[3]);
			}
		}
		return matchedNames;
	};
};