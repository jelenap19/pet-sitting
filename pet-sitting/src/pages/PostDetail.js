import React from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import {Comment} from '../components/Comment';

export const  PostDetail =() => {
  const { id } = useParams();

 
  return ( 'post details' );
}
