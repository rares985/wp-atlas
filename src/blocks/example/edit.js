import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ 'WP Atlas – Example Block (editor)' }
		</p>
	);
}
