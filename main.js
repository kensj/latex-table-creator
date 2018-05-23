var head = '\\begin{center}\n'
			+ '\\begin{tabular}{ | l | p{7cm} |}\n'
			+ '\\hline\n';

var foot = '\\end{tabular} \n \\end{center}';

$('#add-table-row').click(function() {	
	$('.input-lists').append('\
		<dt class="row-element"><br>\
			<input class="input row-name" type="text" placeholder="Row Name">\
			<textarea class="textarea row-content" placeholder="Row Content"></textarea>\
			<button class="button is-danger" id="delete-table-row">Delete Table Row</button>\
		<br></dt>\
	');
});

$(document).on('click', '#delete-table-row', function(){ 
	$(this).parent().remove();
}); 

$('#submit').click(function() {

	var nodeLength = $('.input-lists').find('.row-element').length;
	var final = head;

	for(var i=0;i<nodeLength;i++) {

		var input = $(document).find('.row-name').get(i).value.trim();
		var text = $(document).find('.row-content').get(i).value.trim();

		if(input.length < 1 && text.length < 1) continue;
		if(input.length < 1) input = 'FILL';
		if(text.length < 1) input = 'FILL';

		var textLines = text.split('\n');
		var textFin = '\\parbox{.45\\textwidth}{\\begin{enumerate}\n';
		for(var j = 0;j < textLines.length;j++) {
			if(textLines.length === 1) 
				textFin = textFin + '\\item[] ' + textLines[j] + '\n';
			else 
				textFin = textFin + '\\item ' + textLines[j] + '\n';
		}
		textFin = textFin + '\\end{enumerate}} \n \\\\ \\hline\n';
		final = final + '\\textbf{' + input + '} & ' + textFin;
	}

	final = final + foot;
	$('#final').text(final);
});
