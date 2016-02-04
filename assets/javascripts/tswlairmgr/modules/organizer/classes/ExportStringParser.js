var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.ExportStringParser = new function() {	
	/*
		Sample export string:
		
		#TSWLMExport#
		META{fmtv}1
		META{gen}omod
		META{omodv}1.0.0
		SFCN{sol/km/km:km01}2,2,1,1,1,1,1,1,1
		SFCN{sol/km/km:km02}1,1,1,,,,,,1
		SFCN{sol/km/km:km03}1,1,1,1,1,1,1,,1
		SFCN{sol/sc/sc:sc01}1,2,1,3,2,1,,,2
		SFCN{sol/sc/sc:sc02}1,1,,1,1,1,1,3,3
		SFCN{sol/sc/sc:sc03}2,1,,,1,1,,1,1
		SFCN{sol/bm/bm:bm01}1,1,2,1,,2,,1,
		SFCN{sol/bm/bm:bm02}1,,3,,,,,,
		SFCN{sol/bm/bm:bm03}2,1,1,3,,1,,,
		SFCN{egy/sd/sd:sd01}1,1,,,,3,,,
		SFCN{egy/sd/sd:sd02}1,1,1,,,,,,
		SFCN{egy/sd/sd:sd03}1,1,1,1,1,1,1,,
		SFCN{egy/cs/cs:cs01}1,1,1,1,,,,,
		SFCN{egy/cs/cs:cs02}1,1,2,1,2,1,,,2
		SFCN{egy/cs/cs:cs03}1,,2,1,1,1,1,1,1
		SFCN{tra/sf/sf:sf01},,,,1,,,,
		SFCN{tra/sf/sf:sf02},,,,,,,1,1
		SFCN{tra/sf/sf:sf03},,,,,,1,1,
		#ENDC#
		
		Directives can also be separated by ; instead of newlines.
	*/
	
	this._maxSupportedFormatVersion = 1;
	
	this._patterns = {
		wrapper: /#TSWLMExport#([\s\S]*)#ENDC#/,
		directive: /^([A-Z]{4})\{([^\}]+)\}(.+)$/,
		sfcnKey: /^([a-z]{3})\/([a-z]{2})\/([a-z]{2}):([a-z]{2}[0-9]{2})$/,
		sfcnCountsNumber: /^([0-9]+)?$/
	};
	
	this.updateFragmentRegistryFromExportString = function(fragmentRegistry, exportString)
	{
		var stats = {
			totalFragments: 0,
			distinctFragments: 0,
			distinctRegions: 0,
			distinctZones: 0,
			distinctLairs: 0,
			distinctBosses: 0
		};
		
		var internalStats = {
			encounteredFragments: {},
			encounteredRegions: {},
			encounteredZones: {},
			encounteredLairs: {},
			encounteredBosses: {}
		};
		
		var updates = [];
		
		var match = this._patterns.wrapper.exec(exportString)
		if(match)
		{
			var payload = match[1];
			var directives = payload.replace(/\n/g, ";").split(";");
			for(var i=0; i<directives.length; i++)
			{
				var directive = directives[i].trim();
				var directiveMatch = this._patterns.directive.exec(directive);
				if(directiveMatch)
				{
					var code = directiveMatch[1];
					var key = directiveMatch[2];
					var data = directiveMatch[3];
					switch(code)
					{
						case "META": // Metadata
							// Can contain keys:
							// - fmtv: Format version
							// - gen: Generator
							// - user-defined metadata like generator version
							// Data: pure data, no special format.
							if(key == "fmtv")
							{
								if(data > this._maxSupportedFormatVersion)
								{
									// Format version is newer than we can handle
									if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.classes.ExportStringParser>: Error: Format version <"+data+"> newer than expected in directive "+i);
									return false;
								}
							}
						break;
						case "SFCN": // Set Fragment Counts
							// Keys have the form:
							// <regionCode>/<zoneCode>/<lairCode>:<bossCode>
							// Data is a list of integers separated with ","; if an integer is zero, no digit will be present.
							var sfcnKeyMatch = this._patterns.sfcnKey.exec(key);
							if(sfcnKeyMatch)
							{
								var regionCode = sfcnKeyMatch[1];
								var zoneCode = sfcnKeyMatch[2];
								var lairCode = sfcnKeyMatch[3];
								var bossCode = sfcnKeyMatch[4];
								
								var regions = tswlairmgr.core.data.getSortedRegions();
								var regionMatched = false;
								for(var rIdx=0; rIdx<regions.length; rIdx++)
								{
									var region = regions[rIdx];
									if(regionCode == region.getId())
									{
										regionMatched = true;
										internalStats.encounteredRegions[region.getId()] = true;
										var zones = region.getSortedZones();
										var zoneMatched = false;
										for(var zIdx=0; zIdx<zones.length; zIdx++)
										{
											var zone = zones[zIdx];
											if(zoneCode == zone.getId())
											{
												zoneMatched = true;
												internalStats.encounteredZones[zone.getId()] = true;
												var lairs = zone.getSortedLairs();
												var lairMatched = false;
												for(var lIdx=0; lIdx<lairs.length; lIdx++)
												{
													var lair = lairs[lIdx];
													if(lairCode == lair.getId())
													{
														lairMatched = true;
														internalStats.encounteredLairs[lair.getId()] = true;
														var bosses = lair.getSortedBosses();
														var bossMatched = false;
														for(var bIdx=0; bIdx<bosses.length; bIdx++)
														{
															var boss = bosses[bIdx];
															if(bossCode == boss.getId())
															{
																bossMatched = true;
																internalStats.encounteredBosses[boss.getId()] = true;
																
																var counts = data.split(/,/);
																if(counts.length == 9)
																{
																	var orientations = [
																		"nw", "n", "ne",
																		"w", "c", "e",
																		"sw", "s", "se"
																	];
																	for(var ci=0; ci<counts.length; ci++)
																	{
																		var count = counts[ci];
																		var fragment = boss.getFragmentSet().getFragmentAtOrientation(orientations[ci]);
																		internalStats.encounteredFragments[fragment.getCode()] = true;
																		
																		var countMatch = this._patterns.sfcnCountsNumber.exec(count);
																		if(countMatch)
																		{
																			count = (count == "") ? 0 : parseInt(count);
																			
																			updates.push({
																				fragment: fragment,
																				count: count	
																			});
																			
																			stats.totalFragmentCount += count;
																			
																			continue;
																		}
																		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.classes.ExportStringParser>: Error: Malformed count <"+count+"> in counts data in directive "+i);
																		return false; // Malformed counts data
																	}
																	continue;
																}
																if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.classes.ExportStringParser>: Error: Malformed counts data <"+data+"> in directive "+i);
																return false; // Malformed counts data
															}
															continue;
														}
														if(!bossMatched)
														{
															if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.classes.ExportStringParser>: Error: Invalid boss code <"+bossCode+"> in directive "+i);
															return false; // Invalid boss code
														}
													}
													continue;
												}
												if(!lairMatched)
												{
													if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.classes.ExportStringParser>: Error: Invalid lair code <"+lairCode+"> in directive "+i);
													return false; // Invalid lair code
												}
											}
											continue;
										}
										if(!zoneMatched)
										{
											if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.classes.ExportStringParser>: Error: Invalid zone code <"+zoneCode+"> in directive "+i);
											return false; // Invalid zone code
										}
									}
									continue;
								}
								if(!regionMatched)
								{
									if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.classes.ExportStringParser>: Error: Invalid region code <"+regionCode+"> in directive "+i);
									return false; // Invalid region code
								}
							}
						break;
					}
				}
				else if(directive.trim().length == 0)
				{
					// Whitespace, discard
				}
				else
				{
					if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.classes.ExportStringParser>: Error: Directive <"+directive+"> did not match");
					return false; // Directive mismatch
				}
			}
		}
		else
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.classes.ExportStringParser>: Error: Wrapper did not match");
			return false; // Wrapper mismatch
		}
		
		// Apply gathered count updates
		for(var uIdx=0; uIdx<updates.length; uIdx++)
		{
			var update = updates[uIdx];
			fragmentRegistry.setCountForFragment(update.fragment, update.count);
		}
		
		// Finalize statistics
		$.each(internalStats.encounteredFragments, function(key, value) { stats.distinctFragments++; });
		$.each(internalStats.encounteredRegions, function(key, value) { stats.distinctRegions++; });
		$.each(internalStats.encounteredZones, function(key, value) { stats.distinctZones++; });
		$.each(internalStats.encounteredBosses, function(key, value) { stats.distinctBosses++; });
		
		return stats;
	};
};