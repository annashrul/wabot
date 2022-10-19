<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class node extends Model
{
	protected $table = 'node_table';

	public $timestamps = false;
    use HasFactory;
}