$('document').ready(function(){
var board = $("#board");
var good = $(this)
const BLACK = 1;
const WHITE = 2;
var player = BLACK;
var coordinates = [];
var count = 0;
var draw = false;
	for (var r = 1; r < 9; r++) {
		for (var c = 1; c < 9; c++) {
			board.append('<div class="space"> </div>')
			$('.space').last().addClass('col'.concat(c));
			$('.space').last().addClass('row'.concat(r));
		};
	};
	var spaces = $(".space");
	spaces.hover(function(){
   		$(this).addClass("hover");
   	}, function(){
   	 $(this).removeClass("hover");
	});
	spaces.eq(27).append('<div class="bcircle circle"> </div>')
	spaces.eq(28).append('<div class="wcircle circle"> </div>')
	spaces.eq(35).append('<div class="wcircle circle"> </div>')
	spaces.eq(36).append('<div class="bcircle circle"> </div>')
	spaces.eq(27).addClass("filled")
	spaces.eq(28).addClass("filled")
	spaces.eq(35).addClass("filled")
	spaces.eq(36).addClass("filled")
	isLegal($(this));

	function horizontalCheckBlack(circle, flips) {
		console.log("start")
		var parent = circle.parent()
		var row = parseInt(parent.attr("class")[14]);
		var col = parseInt(parent.attr("class")[9]);
		var right = spaces.eq((row-1)*8+col)
		var left = spaces.eq((row-1)*8+col-2)
		var rightc = right.children().first()
		console.log(rightc.attr("class"))
		console.log(row)
		console.log(col)
		if(draw == true && rightc.hasClass("bcircle")) {
			console.log("hi")
			circle.removeClass("wcircle")
			circle.addClass("bcircle")
		}
		if(!right.hasClass("filled") && draw == false) {
			console.log("End")
		}
		if(rightc.hasClass("bcircle")) {
			console.log("black")
		}
		else if (!right.hasClass("filled") && draw == true) {
			console.log("Correct space")
			right.append('<div class="spots circle"> </div>')
			draw = false;
		}
		else if (right.hasClass("filled") && rightc.hasClass("wcircle")) {
			console.log("filled")
			draw = true;
			flips.push(right)
			horizontalCheckBlack(rightc, flips)
		}
	}
	function horizontalCheckWhite(circle, flips) {
		console.log("start")
		var parent = circle.parent()
		var row = parseInt(parent.attr("class")[14]);
		var col = parseInt(parent.attr("class")[9]);
		var right = spaces.eq((row-1)*8+col)
		var left = spaces.eq((row-1)*8+col-2)
		var rightc = right.children().first()
		console.log(rightc.attr("class"))
		console.log(row)
		console.log(col)
		if(draw == true && rightc.hasClass("wcircle")) {
			console.log("hi")
			circle.removeClass("bcircle")
			circle.addClass("wcircle")
		}
		if(!right.hasClass("filled") && draw == false) {
			console.log("End")
		}
		if(rightc.hasClass("wcircle")) {
			console.log("black")
		}
		else if (!right.hasClass("filled") && draw == true) {
			console.log("Correct space")
			right.append('<div class="spots circle"> </div>')
			draw = false;
		}
		else if (right.hasClass("filled") && rightc.hasClass("bcircle")) {
			console.log("filled")
			console.log("white")
			draw = true;
			flips.push(right)
			horizontalCheckWhite(rightc, flips)
		}
	}
	function getLegalMoves() {
		if (player == BLACK){
			var blacks = $(".bcircle")
			for (var i = 0; i < blacks.length; i++) {
				var flips = [];
				horizontalCheckBlack(blacks.eq(i), flips)
				flipCheckers(flips);
			}
			return [];
		}
	}
		function getLegalBlackMoves() {
			if (player == BLACK){
				var blacks = $(".bcircle")
				for (var i = 0; i < blacks.length; i++) {
					var flips = [];
					horizontalCheckBlack(blacks.eq(i), flips)
					flipCheckers(flips);
				}
				return [];
			}
		}	
		function getLegalWhiteMoves() {
			if (player == WHITE){
				var white = $(".wcircle")
				for (var i = 0; i < whites.length; i++) {
					var flips = [];
					horizontalCheckWhite(whites.eq(i), flips)
					flipCheckers(flips);
				}
				return [];
			}
		}	
	function isLegal(space) {
		if (space.hasClass("filled")) {
			return false;
		}
		var legalMoves = getLegalBlackMoves();
		return true;
	}
	spaces.click(function(){
			count = 0;
			if(player == BLACK) {
				if(isLegal($(this))) {
					$(this).children().remove();
					$(this).children().removeClass("spots")
					$(this).append('<div class="bcircle circle"> </div>')
					$(this).addClass("filled")
					player = WHITE;
				}
			}
			else {
				if(isLegal($(this))) {
					$(this).append('<div class="wcircle circle"> </div>')
					$(this).addClass("filled")
					player = BLACK;
				}
			}
	})
function flipCheckers(flips) {
	console.log(flips)
}


});
