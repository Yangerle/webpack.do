import _ from 'lodash';
import numRef from './ref3.json';
import A from './library/one3';
import B from './library/two3';
import C from './library/three3';

export function numToWord(num) {
	return _.reduce(numRef, (accum, ref) => {
		return ref.num === num ? ref.word : accum;
	}, '');
}

export function wordToNum(word) {
	return _.reduce(numRef, (accum, ref) => {
		return ref.word === word && word.toLowerCase() ? ref.num : accum;
	}, -1);
}

