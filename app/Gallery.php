<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'name',
  ];
  
  
  public function author()
  {
    return $this->belongsTo('App\User');
  }
  
  public function pictures()
  {
    return $this->hasMany('App\Picture');
  }
  
}
