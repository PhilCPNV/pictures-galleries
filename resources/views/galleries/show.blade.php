@extends('layouts.app')

@section('content')
<h1>Gallery: {{ $gallery->name }} <a href="{{ route('galleries.pictures.create', compact('gallery')) }}">+</a></h1>
<p>Provided by {{ $gallery->author }} </p>
  <ul>
  @foreach ($gallery->pictures as $picture)
    <li>
      <a href="{{ route('galleries.pictures.show', compact('gallery', 'picture')) }}">{{ $picture->title }}
        <img src="{{ route('galleries.pictures.show', compact('gallery', 'picture')) }}">
      </a>
    </li>
  @endforeach
  </ul>
@endsection