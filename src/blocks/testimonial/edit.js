import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
	InspectorControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import './editor.scss';

function StarRating( { rating, onChange } ) {
	const stars = [];
	for ( let i = 1; i <= 5; i++ ) {
		stars.push(
			<span
				key={ i }
				className={ `wp-block-wp-atlas-testimonial__star ${ i <= rating ? 'is-filled' : '' }` }
				onClick={ () => onChange( i ) }
				onKeyDown={ ( e ) => {
					if ( e.key === 'Enter' || e.key === ' ' ) {
						onChange( i );
					}
				} }
				role="button"
				tabIndex={ 0 }
				aria-label={ `${ i } star${ i !== 1 ? 's' : '' }` }
			>
				{ i <= rating ? '★' : '☆' }
			</span>
		);
	}
	return <div className="wp-block-wp-atlas-testimonial__rating">{ stars }</div>;
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		mediaId,
		mediaUrl,
		mediaAlt,
		clientName,
		clientRole,
		testimonialText,
		rating,
		contentAlign,
		elevateOnHover,
	} = attributes;

	const onSelectMedia = ( media ) => {
		setAttributes( {
			mediaId: media.id,
			mediaUrl: media.url,
			mediaAlt: media.alt,
		} );
	};

	const onRemoveMedia = () => {
		setAttributes( {
			mediaId: undefined,
			mediaUrl: '',
			mediaAlt: '',
		} );
	};

	const blockProps = useBlockProps( {
		className: elevateOnHover ? 'has-elevate-on-hover' : '',
	} );

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ contentAlign }
					onChange={ ( value ) =>
						setAttributes( { contentAlign: value } )
					}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Rating', 'wp-atlas' ) }>
					<RangeControl
						label={ __( 'Stars', 'wp-atlas' ) }
						value={ rating }
						onChange={ ( value ) =>
							setAttributes( { rating: value } )
						}
						min={ 1 }
						max={ 5 }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Effects', 'wp-atlas' ) }>
					<ToggleControl
						label={ __( 'Elevate on hover', 'wp-atlas' ) }
						checked={ elevateOnHover }
						onChange={ ( value ) =>
							setAttributes( { elevateOnHover: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wp-block-wp-atlas-testimonial__header">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectMedia }
							allowedTypes={ [ 'image' ] }
							value={ mediaId }
							render={ ( { open } ) => (
								<div className="wp-block-wp-atlas-testimonial__avatar-wrapper">
									{ mediaUrl ? (
										<>
											<img
												className="wp-block-wp-atlas-testimonial__avatar"
												src={ mediaUrl }
												alt={ mediaAlt }
												onClick={ open }
											/>
											<Button
												className="wp-block-wp-atlas-testimonial__avatar-remove"
												onClick={ onRemoveMedia }
												variant="secondary"
												size="small"
											>
												{ __( '×', 'wp-atlas' ) }
											</Button>
										</>
									) : (
										<Button
											className="wp-block-wp-atlas-testimonial__avatar-upload"
											onClick={ open }
											variant="secondary"
										>
											{ __( 'Photo', 'wp-atlas' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>

					<div className="wp-block-wp-atlas-testimonial__client-info">
						<RichText
							tagName="span"
							className="wp-block-wp-atlas-testimonial__name"
							value={ clientName }
							onChange={ ( value ) =>
								setAttributes( { clientName: value } )
							}
							placeholder={ __( 'Client name', 'wp-atlas' ) }
							allowedFormats={ [] }
						/>
						<RichText
							tagName="span"
							className="wp-block-wp-atlas-testimonial__role"
							value={ clientRole }
							onChange={ ( value ) =>
								setAttributes( { clientRole: value } )
							}
							placeholder={ __(
								'Role / Company / Location',
								'wp-atlas'
							) }
							allowedFormats={ [] }
						/>
					</div>
				</div>

				<div
					className="wp-block-wp-atlas-testimonial__content"
					style={ { textAlign: contentAlign } }
				>
					<RichText
						tagName="p"
						className="wp-block-wp-atlas-testimonial__text"
						value={ testimonialText }
						onChange={ ( value ) =>
							setAttributes( { testimonialText: value } )
						}
						placeholder={ __(
							'Write testimonial…',
							'wp-atlas'
						) }
					/>
				</div>

				<StarRating
					rating={ rating }
					onChange={ ( value ) =>
						setAttributes( { rating: value } )
					}
				/>
			</div>
		</>
	);
}
