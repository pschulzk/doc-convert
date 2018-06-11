/**
 *
 * Defines available formats from and to convert to
 *
 */

export enum EConversionFormats {
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    HTML = 'text/html',
    PDF = 'application/pdf',
    TEXT = 'text/plain',
    ODT = 'application/vnd.oasis.opendocument.text',
}

const allowedFormats: Map<string, string> = new Map();
allowedFormats.set( 'DOCX', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' );
allowedFormats.set( 'HTML', 'text/html' );
allowedFormats.set( 'PDF', 'application/pdf' );
allowedFormats.set( 'TEXT', 'text/plain' );
allowedFormats.set( 'ODT', 'application/vnd.oasis.opendocument.text' );

// export allowedFormats;