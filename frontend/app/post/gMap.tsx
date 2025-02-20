"use client";
import {  useLayoutEffect, useRef } from "react";
import * as maplibregl from 'maplibre-gl';  

export type MapModal = {
    lat : number 
    long : number 
}

export default function GeoMaps(props : MapModal) {

    const hasRun = useRef(false);


    useLayoutEffect(()=>{
        
        if (!hasRun.current) { 
            console.log("once" , props);
            let map = new maplibregl.Map({
                container: 'map-container',
                style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
                center: [props.long, props.lat], // starting position [lng, lat]
                zoom: 9 // starting zoom
             });
    
             const marker = new maplibregl.Marker()
            .setLngLat([props.long, props.lat])
            .addTo(map);
            hasRun.current = true;
          }
        
    },[])

    return (
        <>
            <div id="map-container" style={{height:"400px",width:"400px"}}></div>

        </>
    )
}
