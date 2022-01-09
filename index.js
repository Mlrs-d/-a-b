function addParticipant() {
	var li_node = document.createElement('li');
	var participant = document.querySelector('#name');
	var text_node = document.createTextNode(participant.value);
	
	var name_regex = /^(이병|일병|상병|병장)( [가-힣]{2,4})$/;  //뭐가 문제지?
	if (name_regex.test(name[1])) {
		li_node.appendChild(text_node);
	
		var list_node = document.querySelector('#participant_list');
		list_node.appendChild(li_node);
	
		participant.value = "";
	} else {
		alert('관등성명을 입력하십시오.');
	}
	
}