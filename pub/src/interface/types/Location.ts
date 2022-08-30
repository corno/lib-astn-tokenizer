
export type LocationInfo = {
    /**
     * position within the document, first character has value 1
     */
    readonly absolutePosition: number
    readonly lineLocation: LineLocation
}

export type LineLocation = {

    /**
     * first line in document has value 1
     */
     readonly line: number
     /**
      * first character on a line has value 1
      */
     readonly character: number
}