<?php

  function uploadImagen(Request $request, $accion){
    // return $request;

    $image = $request->input('foto');
    $imageOriginal = $request->input('fotoOriginal');

    $this->imagenUpdate($imageOriginal,'original');
    $this->imagenUpdate($image,'final');
    return "true";
  }

  function imagenUpdate($image_64, $name){
    $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf
    $replace = substr($image_64, 0, strpos($image_64, ',')+1);
    $image = str_replace($replace, '', $image_64);
    $image = str_replace(' ', '+', $image);
    $imageName = $name  .'.'.$extension;

    // Storage::disk('public')->put('photos_nuevas/'.$imageName, base64_decode($image));
  }