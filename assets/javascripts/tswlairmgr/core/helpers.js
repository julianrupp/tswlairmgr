var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.helpers = tswlairmgr.core.helpers || {};

tswlairmgr.core.helpers.Observable = function Observable(origin) {
	this._origin = origin;
	this._observers = [];
	
	this.registerCallback = function(callback) {
		if(!(callback in this._observers))
		{
			this._observers.push(callback);
			return true;
		}
		return false;
	};
	
	this.unregisterCallback = function(callback) {
		var self = this;
		$.each(this._observers, function(index, currentCallback) {
			if(currentCallback === callback)
			{
				delete self._observers[index];
				return true;
			}
		});
		return false;
	};
	
	this.notify = function(context) {
		var self = this;
		$.each(this._observers, function(index, callback) {
			if(callback && callback.call)
			{
				callback.call(self.origin, context);
			}
		});
	};
};

tswlairmgr.core.helpers.UTF8String = new function() {
	this.encode = function(bytestring) {
		var utfstring = "";
		
		bytestring = bytestring.replace(/\r\n/g, "\n");
		
		var i;
		var ord;
		for(i=0; i<bytestring.length; i++)
		{
			ord = bytestring.charCodeAt(i);
			
			if(ord < 128)
			{
				utfstring += String.fromCharCode(ord);
			}
			else if( (ord >= 128) && (ord < 2048) )
			{
				utfstring += String.fromCharCode( (ord >> 6) | 192 );
				utfstring += String.fromCharCode( (ord & 63) | 128 );
			}
			else
			{
				utfstring += String.fromCharCode( (ord >> 12) | 224 );
				utfstring += String.fromCharCode( ((ord >> 6) & 63) | 128 );
				utfstring += String.fromCharCode( (ord & 63) | 128 );
			}
		}
		
		return utfstring;
	};
	
	this.decode = function(utfstring) {
		var bytestring = "";
		
		var i = 0;
		var ord = ord2 = ord3 = 0;
		
		while(i<utfstring.length)
		{
			ord = utfstring.charCodeAt(i);
			
			if(ord < 128)
			{
				bytestring += String.fromCharCode(ord);
				i++;
			}
			else if( ord > 191 && ord < 224)
			{
				ord2 = utfstring.charCodeAt(i+1);
				
				bytestring += String.fromCharCode( ((ord & 31) << 6) | (ord2 & 63) );
				i+=2;
			}
			else
			{
				ord2 = utfstring.charCodeAt(i+1);
				ord3 = utfstring.charCodeAt(i+2);
				
				bytestring += String.fromCharCode( ((ord & 15) << 12) | ((ord2 & 63) << 6) | (ord3 & 63) );
				i+=3;
			}
		}
		
		return bytestring;
	};
}

tswlairmgr.core.helpers.CRC32 = new function() {
	this._polynomial = 0xedb88320;
	this._lookupTable = [];
	
	this._buildLookupTable = function() {
		var code;
		var ord;
		var round;
		for(ord=0; ord<256; ord++)
		{
			code = ord;
			for(round=0; round<8; round++)
			{
				if(code & 1)
				{
					code = this._polynomial ^ (code >>> 1);
				}
				else
				{
					code = code >>> 1;
				}
			}
			
			this._lookupTable.push(code);
		}
	};
	
	this._buildLookupTable();
	
	this.integerChecksum = function(data) {
		data = tswlairmgr.core.helpers.UTF8String.encode(data);
		
		var sum = 0 ^ (-1);
		for(i=0; i<data.length; i++)
		{
			sum = (sum >>> 8) ^ this._lookupTable[
				(sum ^ data.charCodeAt(i)) & 0xff
			];
		}
		
		return ((sum ^ (-1)) >>> 0);
	};
	
	this.textChecksum = function(data) {
		return this.integerChecksum(data).toString(36);
	};
	
	this.checksum = function(data) {
		return this.integerChecksum(data);
	};
};

tswlairmgr.core.helpers.Base64URL = new function() {
	this._alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
	
	this.encode = function(data) {
		data = tswlairmgr.core.helpers.UTF8String.encode(data);
		var encodedBlocks = [];
		
		var i;
		var currentInputBlock;
		var currentOutputBlock;
		var k;
		for(i=0; i<data.length; i+=3)
		{
			currentInputBlock = [0, 0, 0];
			currentOutputBlock = [0, 0, 0, 0];
			
			currentInputBlock[0] = data.charCodeAt(i);
			currentInputBlock[1] = data.charCodeAt(i+1);
			currentInputBlock[2] = data.charCodeAt(i+2);
			
			currentOutputBlock[0] = ( (currentInputBlock[0]) >> 2);
			currentOutputBlock[1] = ( (currentInputBlock[0] & 3) << 4 ) | (currentInputBlock[1] >> 4);
			currentOutputBlock[2] = ( (currentInputBlock[1] & 15) << 2 ) | (currentInputBlock[2] >> 6);
			currentOutputBlock[3] = ( (currentInputBlock[2] & 63) );
			
			if(isNaN(currentInputBlock[2])) { currentOutputBlock[3] = 64; }
			if(isNaN(currentInputBlock[1])) { currentOutputBlock[2] = 64; }
			
			for(k=0; k<currentOutputBlock.length; k++)
			{
				if(currentOutputBlock[k] < 64)
				{
					encodedBlocks.push(this._alphabet.charAt(currentOutputBlock[k]));
				}
			}
		}
		
		var encoded = encodedBlocks.join("");
		return encoded;
	};
	
	this.decode = function(data) {
		data = data.replace(/[^A-Za-z0-9\-_=]/g, "");
		while(data.length % 4 != 0)
		{
			data += this._alphabet.charAt(64);
		}
		
		var decoded = "";
		
		var i = 0;
		var currentInputBlock = [];
		var currentOutputBlock = [];
		
		while(i < data.length)
		{
			currentInputBlock[0] = this._alphabet.indexOf(data.charAt(i));
			currentInputBlock[1] = this._alphabet.indexOf(data.charAt(i+1));
			currentInputBlock[2] = this._alphabet.indexOf(data.charAt(i+2));
			currentInputBlock[3] = this._alphabet.indexOf(data.charAt(i+3));
			
			currentOutputBlock[0] = ( (currentInputBlock[0]) << 2 ) | (currentInputBlock[1] >> 4);
			currentOutputBlock[1] = ( (currentInputBlock[1] & 15) << 4 ) | (currentInputBlock[2] >> 2);
			currentOutputBlock[2] = ( (currentInputBlock[2] & 3) << 6 ) | (currentInputBlock[3]);
			
			decoded += String.fromCharCode(currentOutputBlock[0]) +
				( (currentInputBlock[2] != 64) ? String.fromCharCode(currentOutputBlock[1]) : "") +
				( (currentInputBlock[3] != 64) ? String.fromCharCode(currentOutputBlock[2]) : "");
			
			i += 4;
		}
		
		decoded = tswlairmgr.core.helpers.UTF8String.decode(decoded);
		
		return decoded;
	};
};