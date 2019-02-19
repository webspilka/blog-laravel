import { CommentCreationInputInterface, CommentsInterface } from '~/apollo/schema/comments'

export default interface CommentRepositoryInterface {
  readonly COMMENTS_PER_PAGE

  getCommentRepliesPaginated (
    commentId: number,
    repliesPage: number,
    repliesPerPage: number
  ): Promise<CommentsInterface>
  getCommentsPaginatedByPost (
    postId: number,
    page: number,
    perPage: number
  ): Promise<CommentsInterface>
  createComment (
    input: CommentCreationInputInterface
  ): Promise<CommentsInterface>
  getComment (
    commentId: number,
    repliesPage: number | undefined,
    repliesPerPage: number | undefined
  ): Promise<CommentsInterface>
}
